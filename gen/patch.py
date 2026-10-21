# -*- coding: utf-8 -*-
import json, re

src = open("/workspace/data.js", encoding="utf-8").read()

# ---- 1. Insert meetings mtg-103..mtg-108 before the closing of the meetings array ----
anchor = "  ],\n\n  tenants: ["   # end of meetings array (line 247), followed by tenants
assert src.count(anchor) == 1, "meetings-array anchor not unique: %d" % src.count(anchor)

def fmt(m):
    t = ",\n".join('        { time: "%s", speaker: "%s", text: "%s" }' % (x["time"], x["speaker"], x["text"]) for x in m["rawTranscript"])
    ai = json.dumps(m["aiSummary"], ensure_ascii=False)
    acts = ", ".join(json.dumps(a, ensure_ascii=False) for a in m["actionItems"])
    g = m["guests"][0]
    return ('    {\n'
            '      id: "%s", tenantId: "%s", podId: "%s",\n'
            '      title: "%s", startTime: "%s", endTime: "%s",\n'
            '      hostName: "%s", status: "%s", hitlStatus: "%s",\n'
            '      guests: [{ id: "%s", badgeId: "%s", name: "%s", email: "%s", phone: "%s", role: "%s", checkedInAt: "%s" }],\n'
            '      rawTranscript: [\n%s\n      ],\n'
            '      aiSummary: %s,\n'
            '      sentimentScore: %d,\n'
            '      actionItems: [%s]\n'
            '    }') % (m["id"], m["tenantId"], m["podId"], m["title"], m["startTime"], m["endTime"],
                        m["hostName"], m["status"], m["hitlStatus"],
                        g["id"], g["badgeId"], g["name"], g["email"], g["phone"], g["role"], g["checkedInAt"],
                        t, ai, m["sentimentScore"], acts)

ids = [103,104,105,106,107,108]
blocks = []
for i in ids:
    m = json.load(open("/tmp/m%d.json" % i, encoding="utf-8"))
    blocks.append(fmt(m))
insert = ",\n".join(blocks) + ",\n"
src = src.replace(anchor, "    " + insert.strip()[:-1] + "\n" + anchor, 1) if False else src.replace(anchor, insert + anchor, 1)

# ---- 2. Add schedule rows so each meeting is findable from the Schedule page ----
sch_anchor = '{ id: "sch-15"'
assert src.count(sch_anchor) == 1
# find the sch-15 line and append new entries after it
lines = src.split("\n")
out = []
for ln in lines:
    out.append(ln)
    if '"sch-15"' in ln:
        # this line ends with ' }' (last schedule entry) -> add comma and new entries
        assert ln.rstrip().endswith("}"), repr(ln[-40:])
        out[-1] = ln.rstrip() + " ,"
        newsched = [
            ("sch-16","tenant-airport-show","POD-05","Biometric Corridors: One Digital Identity Across Terminals","09:00 AM","09:45 AM","Sarah Whitmore","Rashid Al Suwaidi","Completed"),
            ("sch-17","tenant-hr-summit","POD-07","Emiratisation Metrics That Actually Predict Retention","10:00 AM","10:45 AM","Layla Haddad","Omar Benali","Completed"),
            ("sch-18","tenant-accessabilities","POD-09","دورة الحياة الرقمية: تقنيات المساعدة لذوي الهمم","10:00 AM","10:45 AM","شيخة المنصوري","عمر الفيصل","Completed"),
            ("sch-19","tenant-wetex","POD-11","Desalination Meets Green Hydrogen: The Grid Balancing Question","11:00 AM","11:45 AM","Fatima Al Nuaimi","Vikram Mehta","Completed"),
            ("sch-20","tenant-najah","POD-12","مسار المهنة: من الجامعة إلى سوق العمل","10:30 AM","11:15 AM","د. حمدة الشامسي","يوسف كارم","Completed"),
            ("sch-21","tenant-arablab","POD-13","Keynote: Lab Automation & AI-assisted Method Validation","09:45 AM","10:30 AM","Dr. Nasser Al Qubaisi","Claire Dubois","Completed"),
        ]
        for j,(sid,t,p,title,s,e,h,gu,stt) in enumerate(newsched):
            row = '    { id: "%s", tenantId: "%s", podId: "%s", title: "%s", startTime: "%s", endTime: "%s", speakerHost: "%s", speakerGuest: "%s", status: "%s" }%s' % (
                sid,t,p,title,s,e,h,gu,stt, "," if j < len(newsched)-1 else "")
            out.append(row)
src = "\n".join(out)

open("/workspace/data.js","w",encoding="utf-8").write(src)
print("data.js patched OK")
