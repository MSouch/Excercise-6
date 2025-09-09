export const challengeContent = {
  1: {
    id: 1,
    title: "Process Group Confusion Crisis",
    scenario: {
      time: "Day 45 - Pre-Turnaround Planning Phase",
      description: "You're in the weekly project review meeting. The turnaround is scheduled to begin in 120 days, and you're presenting your detailed schedule. The Operations Manager interrupts: \"Why is procurement execution showing up during our planning phase? Execution doesn't start for four months!\"\n\nThe Engineering Manager adds: \"And why do you have monitoring activities starting now? We're not executing anything yet!\"\n\nYour Project Manager looks concerned. The room falls silent as stakeholders question whether your planning approach aligns with established industrial practices.\n\nThe Risk: Stakeholder confidence in your planning approach is eroding due to terminology confusion between PMI Process Groups and industrial project phases."
    },
    question: "What's your response to address this confusion?",
    options: {
      A: "Revise your schedule to move all \"executing\" activities to the physical execution phase and all \"monitoring\" activities to after execution begins",
      B: "Change all terminology to match industrial phase names to avoid confusion",
      C: "Explain that PMI Process Groups are logical groupings that distribute across industrial project phases, not sequential phases themselves",
      D: "Defend your schedule without explanation, insisting stakeholders need to learn PMI terminology"
    },
    correctAnswer: "C",
    feedback: {
      A: {
        correct: false,
        message: "This approach will damage project success by moving critical procurement execution too late. Critical items like pressure vessels require 6-12 month lead times. Late procurement decisions increase project costs by 15-25% and extend schedules by 20-35%.",
        guidingQuestion: "How can you help stakeholders understand that PMI \"executing\" processes often begin during industrial \"planning\" phases?",
        explanation: "Moving procurement to physical execution phase creates equipment delays, premium pricing, and reduced vendor competition due to compressed timelines."
      },
      B: {
        correct: false,
        message: "Simply changing terminology doesn't address the fundamental misunderstanding and misses the opportunity to build genuine understanding of integrated planning approaches.",
        guidingQuestion: "What explanation would help stakeholders see the value in your integrated approach?",
        explanation: "Cosmetic terminology fixes create miscommunication about activity timing, resistance to proven practices, and artificial barriers between planning and execution."
      },
      C: {
        correct: true,
        message: "This systematic explanation addresses the root cause of confusion while building stakeholder understanding of how PMI concepts enhance rather than replace industrial practices.",
        explanation: "PMI Process Groups are logical groupings that distribute across industrial project phases. This preserves proven practices like early procurement while demonstrating how different processes work together across phases, building credibility and stakeholder engagement."
      },
      D: {
        correct: false,
        message: "Defending without explaining creates adversarial relationships with stakeholders whose expertise you need for successful implementation.",
        guidingQuestion: "How can you leverage stakeholder expertise while demonstrating the value of your integrated approach?",
        explanation: "Teams report 40% more scope changes, 25% more rework, and significantly reduced stakeholder engagement when planners don't explain their approaches."
      }
    }
  },
  2: {
    id: 2,
    title: "The Charter Gap Crisis",
    scenario: {
      time: "Day 38 - Definition Phase Deep Dive",
      description: "You're developing the detailed turnaround plan when you realize the project charter contains significant gaps. The scope boundaries are vague (\"refurbish critical equipment\"), success criteria are generic (\"complete safely on time and budget\"), and stakeholder expectations aren't documented.\n\nYour Engineering Lead approaches: \"The operations team is asking about shutdown duration limits, but I can't find that constraint anywhere. Maintenance wants to know which equipment is truly critical versus nice-to-have, but the charter just says 'critical equipment.'\"\n\nMeanwhile, the Contracts Manager emails: \"Three contractors are asking for clarification on scope boundaries. Without clear charter requirements, they're pricing worst-case scenarios, inflating our budget by 30%.\"\n\nThe Risk: Unclear initiating process outputs are undermining your ability to create implementable plans that align with stakeholder expectations."
    },
    question: "How do you address these charter gaps?",
    options: {
      A: "Facilitate charter clarification sessions with key stakeholders to establish clear planning parameters before continuing",
      B: "Proceed with planning based on your best interpretation of the vague charter, making assumptions as needed",
      C: "Create multiple planning scenarios to cover all possible interpretations of the charter",
      D: "Escalate to senior management to get a new charter written by someone else"
    },
    correctAnswer: "A",
    feedback: {
      A: {
        correct: true,
        message: "Facilitating charter clarification sessions positions you as a strategic contributor while establishing the clear planning parameters your work requires.",
        explanation: "This approach leverages your planning expertise, engages stakeholders to create ownership, prevents future problems, strengthens relationships, and provides clear foundation for all subsequent planning activities."
      },
      B: {
        correct: false,
        message: "Making assumptions about unclear charter elements creates a planning time bomb. Projects with poorly defined charters experience 45% more scope changes and 35% higher costs.",
        guidingQuestion: "How can you use your planning expertise to improve the foundation rather than work around weak foundations?",
        explanation: "Assumptions will likely conflict with stakeholder expectations, leading to major scope changes, budget overruns, and schedule delays when misalignments surface during execution."
      },
      C: {
        correct: false,
        message: "Multiple planning scenarios for charter ambiguities create more problems than they solve, leading to decision paralysis and contractor confusion.",
        guidingQuestion: "What approach would eliminate ambiguity rather than manage it?",
        explanation: "Teams report decision paralysis during execution, increased planning effort with reduced clarity, and resource allocation conflicts between competing scenarios."
      },
      D: {
        correct: false,
        message: "Escalating charter problems abdicates your professional responsibility and wastes your unique expertise in understanding planning parameter requirements.",
        guidingQuestion: "How can you use your planning expertise to strengthen the project foundation?",
        explanation: "You understand stakeholder interfaces, can translate business objectives into actionable requirements, and can identify and resolve specific ambiguities better than senior managers removed from planning details."
      }
    }
  },
  3: {
    id: 3,
    title: "The Planning Silo Trap",
    scenario: {
      time: "Day 52 - Detailed Planning Phase",
      description: "You're proud of your comprehensive turnaround schedule—2,800 activities, critical path identified, resource histograms completed. But today's integrated planning review reveals serious problems.\n\nThe Risk Manager presents: \"The schedule doesn't account for permit approval timelines. Environmental permits need 45 days minimum, but work is scheduled to start in 30 days.\"\n\nThe Procurement Manager adds: \"Critical valve deliveries aren't aligned with installation dates. The schedule shows installation Week 3, but valves won't arrive until Week 5.\"\n\nThe Quality Manager continues: \"Inspection resources are overallocated by 300% during peak weeks. We'll never be able to verify this much work with our team size.\"\n\nThe Risk: Functionally excellent but unintegrated planning is creating execution impossibilities that threaten the entire turnaround."
    },
    question: "How do you address these functional disconnects?",
    options: {
      A: "Revise your schedule to accommodate all the functional inputs and re-optimize independently",
      B: "Create separate schedules for each function and manage interfaces manually",
      C: "Ask each function to adjust their constraints to fit your optimized schedule",
      D: "Implement integrated planning workshops with all functions to develop coordinated solutions and common assumptions"
    },
    correctAnswer: "D",
    feedback: {
      A: {
        correct: false,
        message: "Revising your schedule to accommodate inputs individually doesn't address the fundamental lack of integration and leads to continuous rework as new disconnects surface.",
        guidingQuestion: "How can you address the root cause of functional disconnects rather than managing their symptoms?",
        explanation: "This reactive approach results in multiple revision cycles, new conflicts emerging each time one is resolved, and schedules that work on paper but fail during execution."
      },
      B: {
        correct: false,
        message: "Creating separate functional schedules with manual interface management creates exponentially more complexity and guarantees interface failures.",
        guidingQuestion: "What approach would create genuine integration rather than manage fragmentation?",
        explanation: "Projects with fragmented planning experience 60% more interface-related delays, 45% higher coordination effort, and significantly more accountability issues when problems occur."
      },
      C: {
        correct: false,
        message: "Asking functions to adjust constraints to fit your schedule ignores operational realities like regulatory requirements, manufacturing limitations, and resource facts.",
        guidingQuestion: "How can you leverage functional expertise rather than override it?",
        explanation: "This creates adversarial relationships, stakeholder resistance, plans that can't be implemented, and loss of credibility with functional experts whose cooperation you need."
      },
      D: {
        correct: true,
        message: "Implementing integrated planning workshops creates genuine coordination and common assumptions across all project functions.",
        explanation: "Integration leverages collective expertise, creates shared ownership, identifies real constraints, develops coordinated solutions, builds common assumptions, and produces plans that work in reality, not just on paper."
      }
    }
  },
  4: {
    id: 4,
    title: "The Visibility Void Crisis",
    scenario: {
      time: "Day 15 - Mid-Execution Performance Review",
      description: "The turnaround has been running for two weeks, and you're in the daily performance meeting. The atmosphere is tense as disconnected information creates confusion about actual project status.\n\nThe Field Construction Manager reports: \"We're 65% complete on mechanical work.\" The Procurement Manager counters: \"But we're only 45% complete on material deliveries.\" The Quality Manager adds: \"Inspection completion is at 30%, well behind both construction and procurement.\"\n\nThe Operations Manager asks the critical question: \"So are we ahead of schedule or behind? When will we actually finish? And what's our real cost position?\"\n\nYour Project Manager turns to you: \"We need integrated performance visibility that everyone can trust. These fragmented reports aren't helping us manage the project.\"\n\nThe Risk: Lack of integrated performance monitoring is preventing effective project management decisions and eroding stakeholder confidence."
    },
    question: "How do you create integrated performance visibility?",
    options: {
      A: "Implement an earned value management system with integrated scope, schedule, and cost measurement",
      B: "Create a master spreadsheet combining all functional reports to show integrated status",
      C: "Ask each function to standardize their individual reporting formats for easier comparison",
      D: "Focus monitoring on the critical path activities only to simplify status reporting"
    },
    correctAnswer: "A",
    feedback: {
      A: {
        correct: true,
        message: "Implementing earned value management creates integrated measurement that quantifies technical progress in consistent monetary terms across all project dimensions.",
        explanation: "EVM provides integrated measurement, objective progress assessment, early problem detection, accurate forecasting, common language across functions, decision support data, and trend analysis for management attention."
      },
      B: {
        correct: false,
        message: "Combining functional reports in a spreadsheet creates the illusion of integration without addressing different measurement methods across functions.",
        guidingQuestion: "What measurement approach would provide objective, integrated performance visibility?",
        explanation: "Manual combination approaches result in inconsistent measurement methods, time delays, errors in data combination, and no ability to forecast performance trends."
      },
      C: {
        correct: false,
        message: "Standardizing report formats improves visual comparison but doesn't create integrated measurement or solve the fundamental measurement coordination problem.",
        guidingQuestion: "How can you create measurement integration rather than just reporting standardization?",
        explanation: "Teams report continued disagreements about project status, inability to forecast accurately, difficulty identifying performance trends early, and persistent decision-making confusion."
      },
      D: {
        correct: false,
        message: "Focusing only on critical path activities oversimplifies monitoring and misses the integrated nature of project performance.",
        guidingQuestion: "What monitoring approach would provide comprehensive yet manageable performance visibility?",
        explanation: "Critical path-only monitoring results in surprise issues when non-critical activities become problematic, invisible resource conflicts, and missed quality or safety issues."
      }
    }
  }
}