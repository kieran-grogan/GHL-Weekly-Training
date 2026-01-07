import type { ScenarioDefinition } from "@/lib/scenarioTypes";

import m01 from "./m01_welcome_sms.json";
import m02 from "./m02_configuration_discipline.json";
import m03 from "./m03_tags_as_events.json";
import m04 from "./m04_form_intake.json";
import m05 from "./m05_data_modeling.json";
import m06 from "./m06_if_else_guardrail.json";
import m07 from "./m07_segmentation_facebook_vs_general.json";
import m08 from "./m08_multi_branch_segmentation.json";
import m09 from "./m09_do_not_contact_guardrail.json";
import m10 from "./m10_consent_gating.json";
import m11 from "./m11_timed_sequence.json";
import m12 from "./m12_no_response_followup.json";
import m13 from "./m13_response_handling.json";
import m14 from "./m14_appointment_scheduled.json";
import m15 from "./m15_appointment_reminders.json";
import m16 from "./m16_pipeline_stage_changed.json";
import m17 from "./m17_stage_won_onboarding.json";
import m18 from "./m18_stale_lead_reactivation.json";
import m19 from "./m19_router_workflow.json";
import m20 from "./m20_micro_workflow_fb.json";
import m21 from "./m21_micro_workflow_general.json";
import m22 from "./m22_booking_assist.json";
import m23 from "./m23_webhook_outbound.json";
import m24 from "./m24_scheduler_daily_ops.json";
import m25 from "./m25_capstone.json";

export const scenarios: ScenarioDefinition[] = [
  m01,
  m02,
  m03,
  m04,
  m05,
  m06,
  m07,
  m08,
  m09,
  m10,
  m11,
  m12,
  m13,
  m14,
  m15,
  m16,
  m17,
  m18,
  m19,
  m20,
  m21,
  m22,
  m23,
  m24,
  m25
];

export const scenarioByModuleId = scenarios.reduce<Record<string, ScenarioDefinition>>(
  (map, scenario) => {
    const moduleId = "workflows" in scenario ? scenario.moduleId : scenario.moduleId;
    map[moduleId] = scenario;
    return map;
  },
  {}
);
