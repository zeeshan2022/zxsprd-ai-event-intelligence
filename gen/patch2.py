# -*- coding: utf-8 -*-
import json

src = open("data.js", encoding="utf-8").read()

def fmt(m):
    t = ",\n".join('        { time: "%s", speaker: "%s", text: %s }' % (x["time"], x["speaker"], json.dumps(x["text"], ensure_ascii=False)) for x in m["rawTranscript"])
    ai = json.dumps(m["aiSummary"], ensure_ascii=False)
    acts = ", ".join(json.dumps(a, ensure_ascii=False) for a in m["actionItems"])
    g = m["guests"][0]
    return ('{\n'
            '      id: "%s", tenantId: "%s", podId: "%s",\n'
            '      title: %s, startTime: "%s", endTime: "%s",\n'
            '      hostName: %s, status: "%s", hitlStatus: "%s",\n'
            '      guests: [{ id: "%s", badgeId: "%s", name: %s, email: "%s", phone: "%s", role: "%s", checkedInAt: "%s" }],\n'
            '      rawTranscript: [\n%s\n      ],\n'
            '      aiSummary: %s,\n'
            '      sentimentScore: %d, actionItems: [%s]\n'
            '    }') % (m["id"], m["tenantId"], m["podId"],
                        json.dumps(m["title"], ensure_ascii=False), m["startTime"], m["endTime"],
                        json.dumps(m["hostName"], ensure_ascii=False), m["status"], m["hitlStatus"],
                        g["id"], g["badgeId"], json.dumps(g["name"], ensure_ascii=False), g["email"], g["phone"], g["role"], g["checkedInAt"],
                        t, ai, m["sentimentScore"], acts)

ids = [103,104,105,106,107,108]
blocks = []
for i in ids:
    m = json.load(open("/tmp/m%d.json" % i, encoding="utf-8"))
    blocks.append(fmt(m))
insert = ",\n    ".join(blocks) + ",\n    "

# ---- 1. Insert meetings at the start of the meetings array (after "meetings: [\n") ----
anchor = "  meetings: [\n    {\n"
assert src.count(anchor) == 1, src.count(anchor)
src = src.replace(anchor, "  meetings: [\n    " + insert + "{\n", 1)

# ---- 2. Update schedule rows so titles/times/status match the new meeting records ----
repl = [
 # sch-5: Airport Show biometric corridors -> new times & Completed
 ('{ id: "sch-5", tenantId: "tenant-airport-show", podId: "POD-05", title: "Biometric Corridors: One Digital Identity Across Terminals", startTime: "10:00 AM", endTime: "10:50 AM"',
  '{ id: "sch-5", tenantId: "tenant-airport-show", podId: "POD-05", title: "Biometric Corridors: One Digital Identity Across Terminals", startTime: "09:00 AM", endTime: "09:45 AM"'),
 # sch-10: Accessabilities session was Scheduled -> Completed
 ('{ id: "sch-10", tenantId: "tenant-accessabilities", podId: "POD-09", title: "دورة الحياة الرقمية: تقنيات المساعدة لذوي الهمم", startTime: "10:00 AM", endTime: "10:45 AM", speakerHost: "شيخة المنصوري", speakerGuest: "عمر الفيصل", status: "Scheduled" }',
  '{ id: "sch-10", tenantId: "tenant-accessabilities", podId: "POD-09", title: "دورة الحياة الرقمية: تقنيات المساعدة لذوي الهمم", startTime: "10:00 AM", endTime: "10:45 AM", speakerHost: "شيخة المنصوري", speakerGuest: "عمر الفيصل", status: "Completed" }'),
 # sch-13: Najah session Scheduled -> Completed
 ('{ id: "sch-13", tenantId: "tenant-najah", podId: "POD-12", title: "مسار المهنة: من الجامعة إلى سوق العمل", startTime: "10:30 AM", endTime: "11:15 AM", speakerHost: "د. حمدة الشامسي", speakerGuest: "يوسف كارم", status: "Scheduled" }',
  '{ id: "sch-13", tenantId: "tenant-najah", podId: "POD-12", title: "مسار المهنة: من الجامعة إلى سوق العمل", startTime: "10:30 AM", endTime: "11:15 AM", speakerHost: "د. حمدة الشامسي", speakerGuest: "يوسف كارم", status: "Completed" }'),
]
for old, new in repl:
    assert src.count(old) == 1, ("sched anchor", old[:60], src.count(old))
    src = src.replace(old, new, 1)

# Add a NEW WETEX schedule row (sch-16) for mtg-106 on POD-11 (its own session slot)
old_row = '    { id: "sch-15"'
assert src.count(old_row) == 1
new_wetex = '    { id: "sch-16", tenantId: "tenant-wetex", podId: "POD-11", title: "Desalination Meets Green Hydrogen: The Grid Balancing Question", startTime: "11:00 AM", endTime: "11:45 AM", speakerHost: "Fatima Al Nuaimi", speakerGuest: "Vikram Mehta", status: "Completed" },\n'
src = src.replace(old_row, new_wetex + old_row, 1)

open("data.js","w",encoding="utf-8").write(src)
print("patched OK")
