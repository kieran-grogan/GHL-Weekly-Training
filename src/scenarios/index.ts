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
  m01 as unknown as ScenarioDefinition,
  m02 as unknown as ScenarioDefinition,
  m03 as unknown as ScenarioDefinition,
  m04 as unknown as ScenarioDefinition,
  m05 as unknown as ScenarioDefinition,
  m06 as unknown as ScenarioDefinition,
  m07 as unknown as ScenarioDefinition,
  m08 as unknown as ScenarioDefinition,
  m09 as unknown as ScenarioDefinition,
  m10 as unknown as ScenarioDefinition,
  m11 as unknown as ScenarioDefinition,
  m12 as unknown as ScenarioDefinition,
  m13 as unknown as ScenarioDefinition,
  m14 as unknown as ScenarioDefinition,
  m15 as unknown as ScenarioDefinition,
  m16 as unknown as ScenarioDefinition,
  m17 as unknown as ScenarioDefinition,
  m18 as unknown as ScenarioDefinition,
  m19 as unknown as ScenarioDefinition,
  m20 as unknown as ScenarioDefinition,
  m21 as unknown as ScenarioDefinition,
  m22 as unknown as ScenarioDefinition,
  m23 as unknown as ScenarioDefinition,
  m24 as unknown as ScenarioDefinition,
  m25 as unknown as ScenarioDefinition
];

export const scenarioByModuleId = scenarios.reduce<Record<string, ScenarioDefinition>>(
  (map, scenario) => {
    const moduleId = "workflows" in scenario ? scenario.moduleId : scenario.moduleId;
    map[moduleId] = scenario;
    return map;
  },
  {}
);
