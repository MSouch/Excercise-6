export const exerciseContent = {
  1: {
    id: 1,
    title: "Process Group Mapping Exercise",
  description: "Create a mapping that shows how PMI Process Groups distribute across the turnaround phases for your stakeholders.",
    fields: [
      {
        id: 'phase2_process_groups',
        label: 'Phase 2: Conceptual Planning - Primary PMI Process Groups',
        type: 'select',
        options: ['Planning + Early Executing', 'Initiating + Planning', 'Executing + Monitoring', 'Planning Only']
      },
      {
        id: 'phase2_activities',
        label: 'Phase 2: Conceptual Planning - Key Planning Activities',
        type: 'textarea',
        placeholder: 'Describe the key planning activities for this phase...'
      },
      {
        id: 'phase3_process_groups',
        label: 'Phase 3: Definition - Primary PMI Process Groups',
        type: 'select',
        options: ['Planning + Monitoring/Controlling', 'Executing + Closing', 'Initiating + Planning', 'Monitoring Only']
      },
      {
        id: 'phase3_activities',
        label: 'Phase 3: Definition - Key Planning Activities',
        type: 'textarea',
        placeholder: 'Describe the key planning activities for this phase...'
      },
      {
        id: 'phase4_process_groups',
        label: 'Phase 4: Detailed Planning - Primary PMI Process Groups',
        type: 'select',
        options: ['Planning + Executing + M&C', 'Planning Only', 'Executing Only', 'Monitoring Only']
      },
      {
        id: 'phase4_activities',
        label: 'Phase 4: Detailed Planning - Key Planning Activities',
        type: 'textarea',
        placeholder: 'Describe the key planning activities for this phase...'
      },
      {
        id: 'phase5_process_groups',
        label: 'Phase 5: Pre-Turnaround - Primary PMI Process Groups',
        type: 'select',
        options: ['Executing + M&C + Planning', 'Planning Only', 'Executing Only', 'Closing + Planning']
      },
      {
        id: 'phase5_activities',
        label: 'Phase 5: Pre-Turnaround - Key Planning Activities',
        type: 'textarea',
        placeholder: 'Describe the key planning activities for this phase...'
      },
      {
        id: 'phase6_process_groups',
        label: 'Phase 6: Turnaround Execution - Primary PMI Process Groups',
        type: 'select',
        options: ['Executing + M&C', 'Executing Only', 'Planning + Executing', 'Monitoring Only']
      },
      {
        id: 'phase6_activities',
        label: 'Phase 6: Turnaround Execution - Key Planning Activities',
        type: 'textarea',
        placeholder: 'Describe the key planning activities for this phase...'
      },
      {
        id: 'phase7_process_groups',
        label: 'Phase 7: Post-Turnaround - Primary PMI Process Groups',
        type: 'select',
        options: ['Closing + M&C', 'Executing + Closing', 'Planning + Closing', 'Monitoring Only']
      },
      {
        id: 'phase7_activities',
        label: 'Phase 7: Post-Turnaround - Key Planning Activities',
        type: 'textarea',
        placeholder: 'Describe the key planning activities for this phase...'
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Process Group Distribution Analysis",
          points: [
            "Phase 2 (Conceptual Planning): Planning + Early Executing - Scope collection, contracting strategy, preliminary planning",
            "Phase 3 (Definition): Planning + Monitoring/Controlling - Scope freeze, risk assessment, change control implementation",
            "Phase 4 (Detailed Planning): Planning + Executing + M&C - Work packages, procurement execution, schedule optimization",
            "Phase 5 (Pre-Turnaround): Executing + M&C + Planning - Mobilization, final preparations, readiness monitoring"
          ]
        },
        {
          title: "Execution and Closing Phases",
          points: [
            "Phase 6 (Turnaround Execution): Executing + M&C - Physical work execution with intensive progress monitoring",
            "Phase 7 (Post-Turnaround): Closing + M&C - Documentation, lessons learned, final performance assessment",
            "Early procurement execution occurs during planning phases to meet long-lead equipment requirements",
            "Monitoring and controlling activities span all phases with varying intensity levels"
          ]
        },
        {
          title: "Integration Insights",
          points: [
            "PMI Process Groups are logical groupings that often occur simultaneously across industrial phases",
            "Different process groups have varying intensity throughout the project lifecycle",
            "Understanding this distribution helps stakeholders see how PMI concepts enhance industrial practices",
            "Integration prevents artificial barriers between planning and execution activities"
          ]
        }
      ],
      keyTakeaways: [
        "PMI Process Groups are logical groupings, not sequential phases",
        "Multiple process groups typically occur simultaneously within industrial project phases",
        "Early procurement execution during planning phases is essential for long-lead items",
        "Monitoring and controlling activities provide continuous oversight throughout all phases"
      ]
    }
  },
  2: {
    id: 2,
    title: "Charter Adequacy Assessment Framework",
  description: "Create a framework for analyzing charter adequacy that you can use on future projects.",
    fields: [
      {
        id: 'scope_boundaries_test',
        label: 'Scope Boundaries - Adequacy Test',
        type: 'textarea',
        placeholder: 'What test would you apply to determine if scope boundaries are adequate?'
      },
      {
        id: 'scope_boundaries_flags',
        label: 'Scope Boundaries - Red Flags',
        type: 'textarea',
        placeholder: 'What red flags indicate inadequate scope boundary definition?'
      },
      {
        id: 'success_criteria_test',
        label: 'Success Criteria - Adequacy Test',
        type: 'textarea',
        placeholder: 'How do you test if success criteria are adequate for planning?'
      },
      {
        id: 'success_criteria_flags',
        label: 'Success Criteria - Red Flags',
        type: 'textarea',
        placeholder: 'What indicates inadequate success criteria definition?'
      },
      {
        id: 'constraints_test',
        label: 'Key Constraints - Adequacy Test',
        type: 'textarea',
        placeholder: 'How do you verify that constraints are adequately defined?'
      },
      {
        id: 'constraints_flags',
        label: 'Key Constraints - Red Flags',
        type: 'textarea',
        placeholder: 'What signals indicate missing or inadequate constraint definition?'
      },
      {
        id: 'stakeholder_expectations_test',
        label: 'Stakeholder Expectations - Adequacy Test',
        type: 'textarea',
        placeholder: 'How do you assess if stakeholder expectations are properly documented?'
      },
      {
        id: 'stakeholder_expectations_flags',
        label: 'Stakeholder Expectations - Red Flags',
        type: 'textarea',
        placeholder: 'What indicates inadequate stakeholder expectation documentation?'
      },
      {
        id: 'clarification_step1',
        label: 'Charter Clarification Process - Step 1',
        type: 'textarea',
        placeholder: 'When gaps are identified, what is your first step?'
      },
      {
        id: 'clarification_step2',
        label: 'Charter Clarification Process - Step 2',
        type: 'textarea',
        placeholder: 'What is your second step in the clarification process?'
      },
      {
        id: 'clarification_step3',
        label: 'Charter Clarification Process - Step 3',
        type: 'textarea',
        placeholder: 'How do you finalize and secure charter clarifications?'
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Adequacy Testing Framework",
          points: [
            "Scope Boundaries: Can I identify specific deliverables and draw clear boundaries around work?",
            "Success Criteria: Are objectives specific, measurable, and tied to business outcomes?",
            "Key Constraints: Are constraints specific enough to guide planning decisions?",
            "Stakeholder Expectations: Do I understand what each key stakeholder needs from this project?"
          ]
        },
        {
          title: "Red Flag Identification",
          points: [
            "Scope: Vague language like 'critical equipment' without definitions, missing exclusions",
            "Success Criteria: Generic goals like 'on time and budget' without specific targets or priorities",
            "Constraints: Missing operational windows, undefined budget parameters, unclear regulatory requirements",
            "Stakeholders: Assumptions about stakeholder alignment, undocumented expectations"
          ]
        },
        {
          title: "Charter Clarification Process",
          points: [
            "Step 1: Document specific gaps with examples of planning decisions that can't be made",
            "Step 2: Facilitate stakeholder workshops to clarify requirements and build consensus",
            "Step 3: Create charter supplements documenting agreements and securing stakeholder approval",
            "Maintain focus on enabling effective planning rather than perfect documentation"
          ]
        }
      ],
      keyTakeaways: [
        "Clear charter elements provide essential context for strategic planning alignment",
        "Adequacy tests focus on planning enablement rather than documentation completeness",
        "Red flags indicate specific areas where planning decisions cannot be made confidently",
        "Systematic clarification processes build stakeholder engagement and project foundation"
      ]
    }
  },
  3: {
    id: 3,
    title: "Integrated Planning Framework",
  description: "Design an integration approach for complex industrial projects that ensures coordination without endless meetings.",
    fields: [
      {
        id: 'functional_input_requirements',
        label: 'Phase 1: Pre-Integration Preparation - Functional Input Requirements',
        type: 'textarea',
        placeholder: 'What inputs should each function provide before integration workshops?'
      },
      {
        id: 'common_information_needed',
        label: 'Phase 1: Pre-Integration Preparation - Common Information Needed',
        type: 'textarea',
        placeholder: 'What shared information must be established before integration?'
      },
      {
        id: 'baseline_assumptions',
        label: 'Phase 1: Pre-Integration Preparation - Baseline Assumptions to Establish',
        type: 'textarea',
        placeholder: 'What baseline assumptions need to be agreed upon upfront?'
      },
      {
        id: 'workshop_participants',
        label: 'Phase 2: Integration Workshop Structure - Participants',
        type: 'textarea',
        placeholder: 'Who should participate in integration workshops?'
      },
      {
        id: 'workshop_agenda',
        label: 'Phase 2: Integration Workshop Structure - Agenda Focus Areas',
        type: 'textarea',
        placeholder: 'What key areas should the workshop agenda address?'
      },
      {
        id: 'decision_making_process',
        label: 'Phase 2: Integration Workshop Structure - Decision-Making Process',
        type: 'textarea',
        placeholder: 'How should decisions be made during integration workshops?'
      },
      {
        id: 'documentation_requirements',
        label: 'Phase 3: Post-Workshop Integration - Documentation Requirements',
        type: 'textarea',
        placeholder: 'What must be documented after integration workshops?'
      },
      {
        id: 'change_management_process',
        label: 'Phase 3: Post-Workshop Integration - Change Management Process',
        type: 'textarea',
        placeholder: 'How should changes to integrated plans be managed?'
      },
      {
        id: 'verification_methods',
        label: 'Phase 3: Post-Workshop Integration - Verification Methods',
        type: 'textarea',
        placeholder: 'How do you verify that integration was successful?'
      },
      {
        id: 'success_metric_1',
        label: 'Integration Success Metric 1',
        type: 'text',
        placeholder: 'Define a measurable success metric for integration...'
      },
      {
        id: 'success_metric_2',
        label: 'Integration Success Metric 2',
        type: 'text',
        placeholder: 'Define a second measurable success metric...'
      },
      {
        id: 'success_metric_3',
        label: 'Integration Success Metric 3',
        type: 'text',
        placeholder: 'Define a third measurable success metric...'
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Pre-Integration Preparation",
          points: [
            "Functional Input Requirements: Each function provides constraints, resource availability, key interfaces, and risk factors with supporting data",
            "Common Information Needed: Project charter clarifications, baseline schedule framework, resource pool definitions, risk register",
            "Baseline Assumptions: Work hour productivity rates, weather windows, permit timelines, material delivery standards",
            "Preparation ensures workshops focus on integration rather than information gathering"
          ]
        },
        {
          title: "Workshop Structure and Process",
          points: [
            "Participants: Planning coordinator plus one decision-maker from each key function (not just representatives)",
            "Agenda Focus: Constraint integration, resource optimization, interface management, risk mitigation, contingency development",
            "Decision-Making: Consensus on solutions, escalation path for unresolvable conflicts, documented agreements",
            "Structure enables productive collaboration while maintaining decision authority"
          ]
        },
        {
          title: "Post-Workshop Implementation",
          points: [
            "Documentation: Integrated assumptions document, interface responsibility matrix, change impact assessment process",
            "Change Management: Impact assessment across all functions before approval, integrated replanning for significant changes",
            "Verification: Cross-functional plan reviews, resource feasibility checks, execution readiness assessments",
            "Follow-through ensures integration survives beyond the workshop environment"
          ]
        }
      ],
      keyTakeaways: [
        "Plan Stability: Less than 10% change in critical path during execution",
        "Resource Utilization: Peak resource demand within 110% of available capacity",
        "Interface Performance: Zero delays due to function-to-function coordination failures",
        "Integrated planning leverages collective expertise for coordinated solutions that work in reality"
      ]
    }
  },
  4: {
    id: 4,
    title: "EVM Implementation Planning",
  description: "Design an EVM implementation approach suitable for industrial turnaround projects that balances comprehensive measurement with practical execution.",
    fields: [
      {
        id: 'organization_method',
        label: 'Control Account Structure - Organization Method',
        type: 'select',
        options: ['Work breakdown structure aligned with execution organization', 'Functional organization alignment', 'Cost center alignment', 'Activity-based organization']
      },
      {
        id: 'control_account_size',
        label: 'Control Account Structure - Typical Control Account Size',
        type: 'select',
        options: ['$100K-$500K per account', '$50K-$100K per account', '$500K-$1M per account', '$25K-$50K per account']
      },
      {
        id: 'number_control_accounts',
        label: 'Control Account Structure - Number of Control Accounts for 500-person turnaround',
        type: 'number',
        placeholder: 'Enter number of control accounts...'
      },
      {
        id: 'physical_percent_complete',
        label: 'Progress Measurement Methods - Physical % Complete Usage',
        type: 'textarea',
        placeholder: 'When and how should physical % complete be used?'
      },
      {
        id: 'milestone_weighted',
        label: 'Progress Measurement Methods - Milestone Weighted Usage',
        type: 'textarea',
        placeholder: 'When should milestone weighted methods be applied?'
      },
      {
        id: 'units_complete',
        label: 'Progress Measurement Methods - Units Complete Usage',
        type: 'textarea',
        placeholder: 'When is units complete method most appropriate?'
      },
      {
        id: 'collection_frequency',
        label: 'Data Collection Process - Collection Frequency',
        type: 'select',
        options: ['Daily for active work, weekly for future work', 'Weekly for all work', 'Daily for all work', 'Monthly for all work']
      },
      {
        id: 'data_sources',
        label: 'Data Collection Process - Data Sources',
        type: 'textarea',
        placeholder: 'What are the primary sources for EVM data collection?'
      },
      {
        id: 'quality_control',
        label: 'Data Collection Process - Quality Control',
        type: 'textarea',
        placeholder: 'How do you ensure data quality in EVM collection?'
      },
      {
        id: 'key_performance_indicators',
        label: 'Performance Analysis - Key Performance Indicators',
        type: 'textarea',
        placeholder: 'What are the essential KPIs for EVM performance analysis?'
      },
      {
        id: 'variance_thresholds',
        label: 'Performance Analysis - Variance Thresholds',
        type: 'textarea',
        placeholder: 'What variance thresholds should trigger analysis and action?'
      },
      {
        id: 'reporting_frequency',
        label: 'Performance Analysis - Reporting Frequency',
        type: 'select',
        options: ['Daily dashboards, weekly reports, monthly forecasts', 'Weekly reports only', 'Daily reports only', 'Monthly reports only']
      }
    ],
    modelAnswer: {
      sections: [
        {
          title: "Control Account Structure Design",
          points: [
            "Organization Method: Work breakdown structure aligned with execution organization (by area/system)",
            "Typical Control Account Size: $100K-$500K per account to balance control with management effort",
            "Number of Control Accounts: 40-60 accounts covering all significant work scope for 500-person turnaround",
            "Structure enables meaningful control without overwhelming administrative burden"
          ]
        },
        {
          title: "Progress Measurement Methods",
          points: [
            "Physical % Complete: For measurable work like pipe installation, equipment replacement (70% of activities)",
            "Milestone Weighted: For complex activities like system commissioning, documentation completion (20% of activities)",
            "Units Complete: For repetitive work like valve overhauls, instrument calibrations (10% of activities)",
            "Method selection based on work characteristics ensures accurate progress measurement"
          ]
        },
        {
          title: "Data Collection and Analysis",
          points: [
            "Collection Frequency: Daily for active work, weekly for future work, monthly for long-term activities",
            "Data Sources: Field supervisors, inspection records, material tracking systems, contractor reports",
            "Quality Control: Cross-verification between progress and actual cost, field verification of reported progress",
            "Performance Analysis: SPI, CPI, TCPI with thresholds of 0.90 for analysis, 0.85 for corrective action"
          ]
        }
      ],
      keyTakeaways: [
        "EVM provides integrated performance measurement by quantifying technical progress in monetary terms",
        "Implementation timeline: 2 weeks for setup, 2 weeks for system deployment, 2 weeks for refinement",
        "Success depends on balancing comprehensive measurement with practical execution requirements",
        "Objective visibility enables accurate completion forecasting and informed management decisions"
      ]
    }
  }
}