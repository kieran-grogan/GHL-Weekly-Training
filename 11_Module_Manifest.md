# Module Manifest

```json
[
  {
    "moduleNumber": 1,
    "moduleId": "M01",
    "title": "Workflow Foundations: Contact Created \u2192 Welcome SMS",
    "phase": "1 (Fundamentals)",
    "file": "modules/01_Workflow_Foundations_Contact_Created_to_Welcome_SMS.md"
  },
  {
    "moduleNumber": 2,
    "moduleId": "M02",
    "title": "Configuration Discipline: New Contact \u2192 Tag + Email + SMS",
    "phase": "1 (Fundamentals)",
    "file": "modules/02_Configuration_Discipline_New_Contact_to_Tag_+_Email_+_SMS.md"
  },
  {
    "moduleNumber": 3,
    "moduleId": "M03",
    "title": "Tags as Events: Tag Added \u2192 Notify + Task",
    "phase": "1 (Fundamentals)",
    "file": "modules/03_Tags_as_Events_Tag_Added_to_Notify_+_Task.md"
  },
  {
    "moduleNumber": 4,
    "moduleId": "M04",
    "title": "Form Intake: Form Submitted \u2192 Tag + Field Update + Task + Notify",
    "phase": "1 (Fundamentals)",
    "file": "modules/04_Form_Intake_Form_Submitted_to_Tag_+_Field_Update_+_Task_+_Notify.md"
  },
  {
    "moduleNumber": 5,
    "moduleId": "M05",
    "title": "Data Modeling: Using Fields to Power Future Branching",
    "phase": "1 (Fundamentals)",
    "file": "modules/05_Data_Modeling_Using_Fields_to_Power_Future_Branching.md"
  },
  {
    "moduleNumber": 6,
    "moduleId": "M06",
    "title": "If/Else Guardrail: Phone Exists \u2192 SMS, Else \u2192 Email",
    "phase": "2 (Branching + Guardrails)",
    "file": "modules/06_If-Else_Guardrail_Phone_Exists_to_SMS,_Else_to_Email.md"
  },
  {
    "moduleNumber": 7,
    "moduleId": "M07",
    "title": "Segmentation: If lead_source = Facebook \u2192 Message A, Else \u2192 Message B",
    "phase": "2 (Branching + Guardrails)",
    "file": "modules/07_Segmentation_If_lead_source_=_Facebook_to_Message_A,_Else_to_Message_B.md"
  },
  {
    "moduleNumber": 8,
    "moduleId": "M08",
    "title": "Multi-Branch Segmentation: Facebook vs Google vs Other",
    "phase": "2 (Branching + Guardrails)",
    "file": "modules/08_Multi-Branch_Segmentation_Facebook_vs_Google_vs_Other.md"
  },
  {
    "moduleNumber": 9,
    "moduleId": "M09",
    "title": "Do-Not-Contact Guardrail: Stop Path",
    "phase": "2 (Branching + Guardrails)",
    "file": "modules/09_Do-Not-Contact_Guardrail_Stop_Path.md"
  },
  {
    "moduleNumber": 10,
    "moduleId": "M10",
    "title": "Consent Gating: If consent_sms = true \u2192 SMS, Else \u2192 Email",
    "phase": "2 (Branching + Guardrails)",
    "file": "modules/10_Consent_Gating_If_consent_sms_=_true_to_SMS,_Else_to_Email.md"
  },
  {
    "moduleNumber": 11,
    "moduleId": "M11",
    "title": "Timed Sequence: Email \u2192 Wait \u2192 Follow-up",
    "phase": "3 (Sequences + Timing)",
    "file": "modules/11_Timed_Sequence_Email_to_Wait_to_Follow-up.md"
  },
  {
    "moduleNumber": 12,
    "moduleId": "M12",
    "title": "No-Response Follow-up Pattern: Check responded tag",
    "phase": "3 (Sequences + Timing)",
    "file": "modules/12_No-Response_Follow-up_Pattern_Check_responded_tag.md"
  },
  {
    "moduleNumber": 13,
    "moduleId": "M13",
    "title": "Response Handling: conversation.reply \u2192 tag responded + stop nurture (Multi-workflow)",
    "phase": "3 (Sequences + Timing)",
    "file": "modules/13_Response_Handling_conversation.reply_to_tag_responded_+_stop_nurture_(Multi-workflow).md"
  },
  {
    "moduleNumber": 14,
    "moduleId": "M14",
    "title": "Appointment Scheduled: Confirm + Tag booked + Stop Nurture",
    "phase": "3 (Sequences + Timing)",
    "file": "modules/14_Appointment_Scheduled_Confirm_+_Tag_booked_+_Stop_Nurture.md"
  },
  {
    "moduleNumber": 15,
    "moduleId": "M15",
    "title": "Appointment Reminders: Wait-based reminders + cancel guardrail",
    "phase": "3 (Sequences + Timing)",
    "file": "modules/15_Appointment_Reminders_Wait-based_reminders_+_cancel_guardrail.md"
  },
  {
    "moduleNumber": 16,
    "moduleId": "M16",
    "title": "Pipeline Stage Changed: Proposal Sent \u2192 Task + Notify",
    "phase": "4 (Pipeline + Ops)",
    "file": "modules/16_Pipeline_Stage_Changed_Proposal_Sent_to_Task_+_Notify.md"
  },
  {
    "moduleNumber": 17,
    "moduleId": "M17",
    "title": "Stage Won: Customer Onboarding + Ops Handoff",
    "phase": "4 (Pipeline + Ops)",
    "file": "modules/17_Stage_Won_Customer_Onboarding_+_Ops_Handoff.md"
  },
  {
    "moduleNumber": 18,
    "moduleId": "M18",
    "title": "Stale Lead Reactivation: Wait + Branch on Responded/Booked",
    "phase": "4 (Pipeline + Ops)",
    "file": "modules/18_Stale_Lead_Reactivation_Wait_+_Branch_on_Responded-Booked.md"
  },
  {
    "moduleNumber": 19,
    "moduleId": "M19",
    "title": "Router Workflow: Intake \u2192 Route by lead_source + Missing-Info Path",
    "phase": "5 (Systems + Micro-workflows)",
    "file": "modules/19_Router_Workflow_Intake_to_Route_by_lead_source_+_Missing-Info_Path.md"
  },
  {
    "moduleNumber": 20,
    "moduleId": "M20",
    "title": "Micro-workflow: FB Nurture Sequence (Triggered by route tag)",
    "phase": "5 (Systems + Micro-workflows)",
    "file": "modules/20_Micro-workflow_FB_Nurture_Sequence_(Triggered_by_route_tag).md"
  },
  {
    "moduleNumber": 21,
    "moduleId": "M21",
    "title": "Micro-workflow: General Nurture (Triggered by route tag)",
    "phase": "5 (Systems + Micro-workflows)",
    "file": "modules/21_Micro-workflow_General_Nurture_(Triggered_by_route_tag).md"
  },
  {
    "moduleNumber": 22,
    "moduleId": "M22",
    "title": "Micro-workflow: Booking Assist + Escalation",
    "phase": "5 (Systems + Micro-workflows)",
    "file": "modules/22_Micro-workflow_Booking_Assist_+_Escalation.md"
  },
  {
    "moduleNumber": 23,
    "moduleId": "M23",
    "title": "Webhook Outbound: Qualified Lead \u2192 Webhook + Logging Tag",
    "phase": "5 (Systems + Micro-workflows)",
    "file": "modules/23_Webhook_Outbound_Qualified_Lead_to_Webhook_+_Logging_Tag.md"
  },
  {
    "moduleNumber": 24,
    "moduleId": "M24",
    "title": "Scheduler Daily Ops (Contactless): Create Daily Task + Notify",
    "phase": "6 (Advanced Ops)",
    "file": "modules/24_Scheduler_Daily_Ops_(Contactless)_Create_Daily_Task_+_Notify.md"
  },
  {
    "moduleNumber": 25,
    "moduleId": "M25",
    "title": "Capstone: Full Lifecycle Automation System (Multi-workflow)",
    "phase": "6 (Capstone)",
    "file": "modules/25_Capstone_Full_Lifecycle_Automation_System_(Multi-workflow).md"
  }
]
```
