export const questions = [
  {
    "id": 1,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Technical",
    "difficulty": "easy",
    "text": "Which of the following BEST describes a technical security control?",
    "answers": [
      { "id": "a", "text": "A policy requiring employees to lock their workstations when leaving their desks" },
      { "id": "b", "text": "A hardware or software mechanism — such as a firewall, encryption, or access control list — that enforces security through technology rather than human action or policy" },
      { "id": "c", "text": "A physical barrier such as a locked door that prevents unauthorized entry" },
      { "id": "d", "text": "A governance procedure outlining how security incidents should be reported" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Requiring employees to lock workstations is an operational control — it relies on human behavior, not a technical mechanism.",
      "b": "Technical controls are implemented through technology — firewalls, encryption, IDS/IPS, and access control lists all enforce security automatically without relying on human action. This is the correct answer.",
      "c": "Physical barriers such as locked doors are physical controls — not technical controls.",
      "d": "Governance procedures and reporting requirements are managerial controls — not technical controls."
    }
  },
  {
    "id": 2,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Technical",
    "difficulty": "medium",
    "text": "A security engineer configures a network to automatically block traffic from IP addresses that exceed 1,000 connection attempts per minute. Which control category does this BEST represent?",
    "answers": [
      { "id": "a", "text": "Managerial" },
      { "id": "b", "text": "Physical" },
      { "id": "c", "text": "Technical" },
      { "id": "d", "text": "Operational" }
    ],
    "correct": "c",
    "explanations": {
      "a": "Managerial controls are administrative — such as policies, risk assessments, and governance procedures — not automated technology enforcement.",
      "b": "Physical controls involve tangible barriers and access restrictions — not automated network traffic blocking.",
      "c": "Automatically blocking connection attempts through network configuration is a technical control — it uses technology to enforce a security requirement without human intervention per event. This is the correct answer.",
      "d": "Operational controls involve human processes and procedures — not automated technology mechanisms."
    }
  },
  {
    "id": 3,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Technical",
    "difficulty": "hard",
    "text": "An organization implements full-disk encryption, endpoint EDR agents, and certificate-based authentication across all laptops. A security auditor categorizes these controls. Which statement BEST describes how these controls should be classified?",
    "answers": [
      { "id": "a", "text": "They are all physical controls since they protect physical devices" },
      { "id": "b", "text": "They are all technical controls — each uses a technology mechanism to enforce security. However, they serve different control types: FDE is preventive (prevents data access if lost), EDR is detective and corrective (detects and responds to threats), and certificate-based auth is preventive (prevents unauthorized access)" },
      { "id": "c", "text": "They are operational controls because they require IT staff to deploy and manage them" },
      { "id": "d", "text": "They are managerial controls because they were mandated by policy" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Physical controls involve physical barriers — protecting physical devices through software/hardware mechanisms is a technical control category.",
      "b": "All three are technical controls (technology-based mechanisms), but they serve different control type purposes — illustrating that category and type are independent dimensions of classification. This is the correct answer.",
      "c": "Requiring IT staff to deploy is an operational aspect, but the controls themselves are technical — the category describes what implements the control, not who manages it.",
      "d": "Being mandated by policy makes it policy-required, but the control itself is implemented technically — the category describes the control mechanism, not its origin."
    }
  },
  {
    "id": 4,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Technical",
    "difficulty": "hard",
    "text": "A SIEM system automatically correlates log events, generates an alert for a potential insider threat, and initiates an automated workflow to disable the user's account pending investigation. How many distinct control types does this SINGLE technical system exercise?",
    "answers": [
      { "id": "a", "text": "One — it is only a detective control since it generates alerts" },
      { "id": "b", "text": "Two — detective (correlating and alerting on the threat) and corrective (disabling the account to limit damage after detection)" },
      { "id": "c", "text": "Three — preventive (blocking future actions), detective (alerting), and corrective (remediating)" },
      { "id": "d", "text": "The SIEM is not a security control — it is only a monitoring tool" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The SIEM exercises more than detection — the automated account disabling is a corrective action taken after detection.",
      "b": "The correlation and alerting is detective (identifies a suspected threat), and the automated account disabling is corrective (limits damage and remediates access after detection). A single system can serve multiple control types. This is the correct answer.",
      "c": "Preventive controls stop threats before they occur — the SIEM acts after the threat indicator is detected, making corrective more accurate than preventive for the account disabling step.",
      "d": "A SIEM that takes automated remediation actions is absolutely a security control — monitoring with automated response qualifies it as both detective and corrective."
    }
  },
  {
    "id": 5,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Managerial",
    "difficulty": "easy",
    "text": "Which of the following is the BEST example of a managerial security control?",
    "answers": [
      { "id": "a", "text": "Deploying an intrusion detection system on the network perimeter" },
      { "id": "b", "text": "Conducting an annual risk assessment to identify and prioritize security risks to the organization" },
      { "id": "c", "text": "Installing badge readers on all server room doors" },
      { "id": "d", "text": "Requiring all employees to complete security awareness training" }
    ],
    "correct": "b",
    "explanations": {
      "a": "An IDS is a technical control — it uses technology to detect intrusions.",
      "b": "A risk assessment is a managerial (administrative) control — it involves governance, oversight, and decision-making processes rather than technical or physical implementations. This is the correct answer.",
      "c": "Badge readers on doors are physical controls — they involve physical access restriction mechanisms.",
      "d": "Security awareness training is an operational control — it changes human behavior through education and procedure."
    }
  },
  {
    "id": 6,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Managerial",
    "difficulty": "medium",
    "text": "A CISO develops a data classification policy, an acceptable use policy, and a vendor risk management program. These are BEST categorized as which type of controls?",
    "answers": [
      { "id": "a", "text": "Technical controls" },
      { "id": "b", "text": "Physical controls" },
      { "id": "c", "text": "Managerial controls" },
      { "id": "d", "text": "Operational controls" }
    ],
    "correct": "c",
    "explanations": {
      "a": "Technical controls are technology mechanisms — policies are not implemented through technology.",
      "b": "Physical controls involve physical barriers — policies do not restrict physical access.",
      "c": "Policies, risk programs, and governance frameworks are managerial (administrative) controls — they guide organizational behavior through oversight and governance rather than technical or physical mechanisms. This is the correct answer.",
      "d": "Operational controls involve day-to-day procedures carried out by people — governance-level policies are managerial, though they may define operational procedures."
    }
  },
  {
    "id": 7,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Managerial",
    "difficulty": "hard",
    "text": "An auditor reviewing a financial services firm's security program finds that several security policies exist but have not been reviewed or updated in three years. The technical controls are current and operational controls are followed. What security risk does outdated managerial control documentation create?",
    "answers": [
      { "id": "a", "text": "No risk — technical and operational controls provide sufficient protection regardless of policy currency" },
      { "id": "b", "text": "Outdated policies may no longer reflect the current threat landscape, regulatory requirements, or organizational changes — creating gaps between documented governance and actual risk posture, potential compliance failures, and unclear accountability when incidents occur" },
      { "id": "c", "text": "The risk is purely cosmetic — auditors may flag it but it has no operational impact" },
      { "id": "d", "text": "Outdated policies automatically become invalid and are replaced by default industry standards" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Technical and operational controls operate within the framework defined by managerial controls — without current policies, technical controls may be misconfigured and operational controls may follow outdated procedures.",
      "b": "Outdated managerial controls create governance gaps — policies not reflecting current requirements may lead to regulatory non-compliance, unclear incident response authority, and misalignment between documented expectations and operational reality. This is the correct answer.",
      "c": "Policy currency has direct operational impact — employees and systems operating under outdated policies may not meet current security requirements.",
      "d": "Outdated policies remain in effect until replaced — they do not automatically default to industry standards."
    }
  },
  {
    "id": 8,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Managerial",
    "difficulty": "hard",
    "text": "A security team maps their controls to NIST CSF. They identify that their patch management schedule, vendor SLA requirements, and data retention policies are all currently categorized as operational controls. A senior security architect argues these should be managerial. Which viewpoint is MORE accurate and why?",
    "answers": [
      { "id": "a", "text": "The original categorization is correct — anything involving schedules or SLAs is operational" },
      { "id": "b", "text": "The architect is partially correct: the policies governing patch frequency and retention periods are managerial controls (governance decisions), while the actual execution of patching and enforcing retention is operational. The SLA requirements in contracts are managerial. The key distinction is governance/decision vs. execution/procedure" },
      { "id": "c", "text": "Both views are wrong — these are all technical controls because they relate to technology management" },
      { "id": "d", "text": "Control categories are subjective — any categorization is equally valid" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The schedule as a policy document is a managerial control — the act of executing the schedule is operational. Conflating the two misses an important distinction.",
      "b": "Managerial controls are governance decisions and policies — the decision about patch frequency, SLA requirements, and retention rules. Operational controls are the execution — actually running patches, monitoring SLA compliance, and enforcing retention. This dual nature is common and important to recognize. This is the correct answer.",
      "c": "These are not technical controls — technical controls are technology mechanisms, not governance decisions or human procedures.",
      "d": "Control categorization has defined meanings — while context matters, the distinction between governance (managerial) and execution (operational) is substantive, not arbitrary."
    }
  },
  {
    "id": 9,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Operational",
    "difficulty": "easy",
    "text": "Which of the following is the BEST example of an operational security control?",
    "answers": [
      { "id": "a", "text": "Encrypting sensitive data stored in a database" },
      { "id": "b", "text": "Security guards performing regular patrols of a data center facility" },
      { "id": "c", "text": "A firewall blocking inbound traffic on port 23" },
      { "id": "d", "text": "A written incident response policy" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Database encryption is a technical control — it uses technology to protect data.",
      "b": "Security guards performing patrols are an operational control — they are people following procedures to enforce security. Operational controls are carried out by humans. This is the correct answer.",
      "c": "A firewall blocking ports is a technical control — it uses technology to enforce network security.",
      "d": "A written incident response policy is a managerial control — it provides governance direction, not operational execution."
    }
  },
  {
    "id": 10,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Operational",
    "difficulty": "medium",
    "text": "An organization's security program includes mandatory security awareness training, a clean desk policy enforced by daily walkthroughs, and a visitor escort requirement in secure areas. These controls are BEST described as:",
    "answers": [
      { "id": "a", "text": "Technical controls — they improve overall security posture" },
      { "id": "b", "text": "Managerial controls — they were defined by senior leadership" },
      { "id": "c", "text": "Operational controls — they rely on human behavior, procedures, and day-to-day activities to enforce security" },
      { "id": "d", "text": "Physical controls — they involve the physical workspace" }
    ],
    "correct": "c",
    "explanations": {
      "a": "Improving security posture is a general goal — not a defining characteristic of a specific control category.",
      "b": "Being defined by leadership determines their governance origin but not their category — operational controls are defined by their implementation mechanism (people/procedures), not their source.",
      "c": "Awareness training, clean desk enforcement, and escort requirements all rely on human behavior and established procedures — the defining characteristic of operational controls. This is the correct answer.",
      "d": "While some physical spaces are involved, the controls themselves are behavioral/procedural — physical controls involve barriers and mechanisms, not behavioral requirements."
    }
  },
  {
    "id": 11,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Operational",
    "difficulty": "hard",
    "text": "An organization relies heavily on operational controls for access management — requiring manager approval emails for system access and manual quarterly access reviews. A security consultant recommends migrating to automated provisioning and automated access certification. What security concern does heavy reliance on operational controls create?",
    "answers": [
      { "id": "a", "text": "Operational controls are always more secure than technical controls" },
      { "id": "b", "text": "Operational controls that depend on human action are subject to human error, inconsistency, scalability limitations, and circumvention — approval emails can be forged or ignored, manual reviews are often rubber-stamped, and the controls may fail to scale with organizational growth" },
      { "id": "c", "text": "Operational controls are not recognized by compliance frameworks and should be eliminated" },
      { "id": "d", "text": "The only risk is cost — operational controls are always functionally equivalent to technical controls" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Operational controls are more vulnerable to human error and inconsistency than properly implemented technical controls — the opposite is often true for reliability.",
      "b": "Human-dependent controls introduce consistency and scale risks: approvals can be rushed, reviews can be superficial, and volume exceeds human capacity at scale. Technical controls automate enforcement consistently. This is the correct answer.",
      "c": "Operational controls are recognized and required by many compliance frameworks — the concern is reliability and scale, not legitimacy.",
      "d": "Functional equivalence fails under scale and human error — a technical control executes identically every time while human-executed controls vary in quality."
    }
  },
  {
    "id": 12,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Operational",
    "difficulty": "hard",
    "text": "A data center requires dual-person integrity (DPI) for all changes to production systems — two authorized personnel must be present for any production modification. This control is BEST categorized as which type and category?",
    "answers": [
      { "id": "a", "text": "Technical preventive — it uses a system to require two approvals" },
      { "id": "b", "text": "Operational preventive — it is a human-enforced procedure requiring two people to prevent unauthorized or erroneous changes" },
      { "id": "c", "text": "Physical detective — it detects when unauthorized persons enter the data center" },
      { "id": "d", "text": "Managerial corrective — it is a policy that corrects errors after they occur" }
    ],
    "correct": "b",
    "explanations": {
      "a": "If enforced purely by human procedure rather than a technical system requiring cryptographic dual approval, it is operational — not technical.",
      "b": "DPI as a human-enforced presence requirement is an operational control (relying on people following procedures) and preventive (prevents unauthorized single-person changes before they occur). This is the correct answer.",
      "c": "DPI is not primarily a detection mechanism — it prevents unauthorized actions by requiring witness presence.",
      "d": "DPI acts before changes occur — it is preventive, not corrective. The policy defining DPI is managerial, but the control implementation is operational."
    }
  },
  {
    "id": 13,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Physical",
    "difficulty": "easy",
    "text": "Which of the following is the BEST example of a physical security control?",
    "answers": [
      { "id": "a", "text": "A firewall rule blocking unauthorized network access" },
      { "id": "b", "text": "Biometric door locks and mantraps controlling entry to a server room" },
      { "id": "c", "text": "A policy prohibiting employees from bringing personal devices to work" },
      { "id": "d", "text": "Encryption applied to data stored on servers" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Firewall rules are technical controls — they use network technology to restrict access.",
      "b": "Biometric door locks and mantraps are physical controls — they use physical mechanisms to restrict physical access to the server room. This is the correct answer.",
      "c": "Device policies are managerial or operational controls — they rely on governance and human behavior, not physical mechanisms.",
      "d": "Data encryption is a technical control — it uses cryptographic technology to protect data."
    }
  },
  {
    "id": 14,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Physical",
    "difficulty": "medium",
    "text": "A facility installs cable locks on workstations, adds motion-activated lighting in parking areas, and installs shatterproof film on ground-floor windows. These are all examples of which control category?",
    "answers": [
      { "id": "a", "text": "Technical" },
      { "id": "b", "text": "Operational" },
      { "id": "c", "text": "Managerial" },
      { "id": "d", "text": "Physical" }
    ],
    "correct": "d",
    "explanations": {
      "a": "Technical controls are software or hardware mechanisms protecting data and systems — not physical barriers and countermeasures.",
      "b": "Operational controls rely on human procedures — these are physical mechanisms not requiring human action per event.",
      "c": "Managerial controls are administrative and governance-based — not physical protective mechanisms.",
      "d": "All three are physical controls — cable locks restrict physical device theft, motion-activated lighting deters and detects physical intruders, and shatterproof film prevents physical breach of windows. This is the correct answer."
    }
  },
  {
    "id": 15,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Physical",
    "difficulty": "hard",
    "text": "A data center uses a mantrap (access control vestibule) at the entry. The mantrap requires badge authentication before the outer door opens, and the inner door will not open until the outer door is fully closed. Which control type does the mantrap PRIMARILY implement?",
    "answers": [
      { "id": "a", "text": "Detective — it records who enters the facility" },
      { "id": "b", "text": "Corrective — it fixes security breaches after they occur" },
      { "id": "c", "text": "Preventive — it physically prevents tailgating and unauthorized entry by ensuring only one door can open at a time" },
      { "id": "d", "text": "Compensating — it substitutes for a weaker control" }
    ],
    "correct": "c",
    "explanations": {
      "a": "Recording entries is a detective function — the mantrap's primary purpose is to prevent unauthorized entry, not merely record it.",
      "b": "Corrective controls respond after an incident — the mantrap prevents incidents before they occur.",
      "c": "The mantrap prevents tailgating and forced entry by design — only one door opens at a time, physically stopping unauthorized personnel from following authorized users. This is a preventive physical control. This is the correct answer.",
      "d": "Compensating controls are alternatives when a primary control cannot be implemented — the mantrap is a primary preventive control, not a substitute."
    }
  },
  {
    "id": 16,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Physical",
    "difficulty": "hard",
    "text": "A security team reviews physical controls after a theft of server equipment. They find that the server room had a badge reader but no video surveillance, and no alarm if the door is held open. After the incident they add cameras, door-hold alarms, and inventory sensors. How do these new controls differ from the badge reader in terms of control type?",
    "answers": [
      { "id": "a", "text": "All four controls are preventive — they all protect the server room" },
      { "id": "b", "text": "The badge reader is preventive (prevents unauthorized entry). Cameras are detective (record and identify events). Door-hold alarms are detective (alert on anomalous behavior). Inventory sensors can be detective (detect missing items) or corrective if they trigger lockdowns. The addition of detective controls provides visibility that was absent before" },
      { "id": "c", "text": "Cameras are corrective controls because they help recover stolen items" },
      { "id": "d", "text": "Alarms are preventive because they stop thieves" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Calling all physical controls preventive ignores the important distinctions between controls that prevent vs. detect vs. respond to incidents.",
      "b": "The badge reader prevents unauthorized entry. Cameras detect and record events. Alarms detect anomalous conditions. Inventory sensors detect missing assets. The pre-incident gap was detective controls — the theft occurred and was not detected in real time. This is the correct answer.",
      "c": "Cameras are detective controls — they record events. Post-incident camera review assists recovery but the control type is detective, not corrective.",
      "d": "Alarms may deter some criminals, making them deterrent controls — they alert to ongoing events but do not physically stop the action once it has begun."
    }
  },
  {
    "id": 17,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Preventive",
    "difficulty": "easy",
    "text": "Which of the following BEST describes a preventive security control?",
    "answers": [
      { "id": "a", "text": "A control that identifies and logs unauthorized access attempts for later review" },
      { "id": "b", "text": "A control that stops a security incident from occurring by blocking, restricting, or removing the ability to perform an unauthorized action" },
      { "id": "c", "text": "A control that restores systems to normal operation after a security incident" },
      { "id": "d", "text": "A control that discourages potential attackers through visible deterrence" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Logging unauthorized attempts describes a detective control — it identifies events after they occur.",
      "b": "Preventive controls stop incidents before or as they happen — firewalls block traffic, encryption prevents data reading, and access controls prevent unauthorized actions. This is the correct answer.",
      "c": "Restoring systems after an incident describes a corrective control — it acts after the incident.",
      "d": "Discouraging attackers through visible deterrence describes a deterrent control — it discourages rather than technically prevents."
    }
  },
  {
    "id": 18,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Preventive",
    "difficulty": "medium",
    "text": "An organization implements application whitelisting — only pre-approved executables can run on endpoints. This control is BEST categorized as:",
    "answers": [
      { "id": "a", "text": "Detective — it identifies unauthorized applications" },
      { "id": "b", "text": "Corrective — it removes unauthorized applications" },
      { "id": "c", "text": "Preventive — it blocks unauthorized executables from running in the first place" },
      { "id": "d", "text": "Deterrent — it discourages employees from installing unauthorized software" }
    ],
    "correct": "c",
    "explanations": {
      "a": "If the control only detected unauthorized apps without blocking execution, it would be detective — but whitelisting blocks execution entirely.",
      "b": "Corrective controls act after an incident — whitelisting prevents execution before it occurs.",
      "c": "Application whitelisting is preventive — it stops unauthorized executables from running before they can cause harm, not after detection. This is the correct answer.",
      "d": "A deterrent control discourages but does not technically block — whitelisting technically prevents execution regardless of user intent."
    }
  },
  {
    "id": 19,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Preventive",
    "difficulty": "hard",
    "text": "A network firewall is configured to block all outbound connections to known command-and-control (C2) IP addresses using a threat intelligence feed. An endpoint is infected with malware that attempts to contact a C2 server. The firewall blocks the connection. Which combination of control category and type does this represent?",
    "answers": [
      { "id": "a", "text": "Operational preventive — a human blocked the connection" },
      { "id": "b", "text": "Technical preventive — technology automatically blocked an unauthorized outbound connection before the malware could communicate with C2 infrastructure" },
      { "id": "c", "text": "Technical detective — the firewall logged the C2 connection attempt" },
      { "id": "d", "text": "Physical corrective — the network hardware stopped the attack" }
    ],
    "correct": "b",
    "explanations": {
      "a": "No human action was required — the firewall automatically applied the block based on threat intelligence, making it technical, not operational.",
      "b": "The firewall used technology (technical category) to block the C2 connection before it succeeded (preventive type) — stopping the malware callback that would enable attacker control. This is the correct answer.",
      "c": "The firewall did log the attempt (detective), but blocking the connection is the preventive action — and when a control serves multiple functions, the primary purpose (blocking) determines the primary classification.",
      "d": "Physical controls involve physical barriers — network hardware enforcing software rules is technical, not physical."
    }
  },
  {
    "id": 20,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Preventive",
    "difficulty": "hard",
    "text": "A security architect argues that no preventive control is 100% effective and that detective and corrective controls are equally important. A junior analyst disagrees, saying preventive controls should be the only focus. Which perspective is MOST aligned with security best practices?",
    "answers": [
      { "id": "a", "text": "The junior analyst — if all threats are prevented, detection and correction are unnecessary" },
      { "id": "b", "text": "The security architect — defense-in-depth requires layered controls. Preventive controls reduce likelihood but cannot prevent all incidents. Detective controls provide visibility when prevention fails. Corrective controls limit damage and restore operations. All three are essential" },
      { "id": "c", "text": "Neither — security controls are ineffective and security relies entirely on user behavior" },
      { "id": "d", "text": "The junior analyst — budget should always prioritize prevention over detection and response" }
    ],
    "correct": "b",
    "explanations": {
      "a": "No control is perfect — assuming 100% prevention is unrealistic and leaves organizations blind when prevention fails.",
      "b": "Defense-in-depth recognizes that prevention will sometimes fail. Layered controls provide detection when prevention misses, and corrective controls limit damage and restore normal operations. This is the correct answer.",
      "c": "Security controls are fundamental — user behavior is one layer but cannot substitute for technical and physical controls.",
      "d": "Concentrating only on prevention creates blind spots — organizations need detection to know when prevention fails and correction to recover."
    }
  },
  {
    "id": 21,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Deterrent",
    "difficulty": "easy",
    "text": "Which of the following BEST describes a deterrent security control?",
    "answers": [
      { "id": "a", "text": "A control that technically prevents unauthorized actions from succeeding" },
      { "id": "b", "text": "A control that discourages potential attackers or violators by making the prospect of attack less appealing or more risky — without necessarily blocking the action technically" },
      { "id": "c", "text": "A control that identifies and logs security events for later investigation" },
      { "id": "d", "text": "A control that restores normal operations after a security incident" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Technically preventing unauthorized actions describes preventive controls — deterrents discourage rather than technically block.",
      "b": "Deterrent controls reduce the likelihood of attacks by discouraging would-be attackers — visible cameras, warning signs, and lighting make attackers less likely to attempt an action even though they are not technically blocked. This is the correct answer.",
      "c": "Identifying and logging events describes detective controls — deterrents operate before an event by discouraging attempts.",
      "d": "Restoring operations describes corrective controls — deterrents operate at the decision stage before an attack is attempted."
    }
  },
  {
    "id": 22,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Deterrent",
    "difficulty": "medium",
    "text": "A company posts 'WARNING: All activity on this system is monitored and recorded' banners on all login screens. A security auditor notes this banner as a deterrent control. Why is this correctly classified as deterrent rather than detective?",
    "answers": [
      { "id": "a", "text": "Login banners technically block unauthorized access" },
      { "id": "b", "text": "The banner discourages unauthorized access by informing potential attackers that their actions will be recorded — but it does not technically prevent login attempts or automatically detect intrusions. It changes attacker behavior through psychological deterrence rather than technical enforcement" },
      { "id": "c", "text": "The banner is a corrective control because it helps prosecute attackers after incidents" },
      { "id": "d", "text": "Login banners are operational controls because IT staff must configure them" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Login banners do not block access — they display informational text that the login process allows past.",
      "b": "The banner's security value is psychological — it informs that monitoring exists, making attackers less likely to proceed. It does not technically detect or prevent anything on its own. This is the correct answer.",
      "c": "Banners may support legal prosecution (a deterrent benefit), but their control type is deterrent — not corrective.",
      "d": "Being configured by IT describes the operational aspect of deployment — the control's category (technical: displayed by technology) and type (deterrent: discourages by informing) are independent."
    }
  },
  {
    "id": 23,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Deterrent",
    "difficulty": "hard",
    "text": "A physical security team installs visible CCTV cameras and posts signage indicating '24-hour video surveillance in operation' even though only 30% of cameras are actively monitored. A security consultant questions whether this is appropriate. What is the security argument for and against this approach?",
    "answers": [
      { "id": "a", "text": "It is always appropriate — cameras are cameras and provide equal deterrence regardless of monitoring" },
      { "id": "b", "text": "For: the visible presence of cameras deters opportunistic attackers even if unmonitored — deterrence value exists regardless of whether every feed is watched. Against: if sophisticated adversaries discover cameras are not monitored, deterrence value is lost and actual detection capability is weaker than implied. The honest risk: over-reliance on deterrence without actual detective capability creates a false sense of security" },
      { "id": "c", "text": "It is never appropriate — all deterrent controls must be fully functional to be used" },
      { "id": "d", "text": "The approach is appropriate only if signs do not mention surveillance" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Sophisticated attackers research environments before attacking — non-monitored cameras provide no detection value and their deterrence may be overcome by reconnaissance.",
      "b": "The deterrence argument is valid for opportunistic attackers who see cameras and assume monitoring. The risk is that detective capability (actual monitoring) is overstated — if detection is needed for corrective action, unmonitored cameras fail. This balanced view is the correct answer.",
      "c": "Partially implemented deterrents have legitimate security value — all-or-nothing thinking ignores realistic risk management trade-offs.",
      "d": "Signage indicating surveillance is a standard deterrent practice — removing signs eliminates deterrent value while the cameras' limitations remain."
    }
  },
  {
    "id": 24,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Deterrent",
    "difficulty": "hard",
    "text": "A company implements a robust security awareness program specifically highlighting that 40% of employees who attempted to bypass security controls were caught and disciplined. From a security control perspective, publicizing enforcement outcomes is BEST described as:",
    "answers": [
      { "id": "a", "text": "A corrective control — disciplining employees corrects bad behavior" },
      { "id": "b", "text": "A deterrent control — publicizing that violations are detected and punished discourages future violations by demonstrating credible consequences" },
      { "id": "c", "text": "A detective control — it demonstrates that violations are detected" },
      { "id": "d", "text": "A directive control — it directs employees toward correct behavior" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The discipline itself is corrective — but publicizing the enforcement outcomes is a separate deterrent action intended to prevent future violations.",
      "b": "Publicizing enforcement creates deterrence — employees considering violations now know consequences are real and likely, making future violations less probable. This is the correct answer.",
      "c": "The detection already occurred — publicizing it is a separate deterrent action leveraging the detection outcome.",
      "d": "Directive controls provide instructions or mandates — publicizing enforcement outcomes creates deterrence through demonstrated consequences, not instructions."
    }
  },
  {
    "id": 25,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Detective",
    "difficulty": "easy",
    "text": "Which of the following BEST describes a detective security control?",
    "answers": [
      { "id": "a", "text": "A control that stops security incidents before they cause damage" },
      { "id": "b", "text": "A control that identifies and alerts on security events, anomalies, or policy violations — providing visibility into what is happening in the environment" },
      { "id": "c", "text": "A control that recovers systems to their pre-incident state" },
      { "id": "d", "text": "A control that serves as a substitute when the primary control cannot be implemented" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Stopping incidents before damage describes a preventive control — detective controls identify events that occur, they do not stop them.",
      "b": "Detective controls provide visibility — IDS alerts, log monitoring, integrity checkers, and SIEM systems identify security events after they begin or complete. This is the correct answer.",
      "c": "Recovering systems describes a corrective control — detective controls identify events but do not restore systems.",
      "d": "Substituting for a primary control describes a compensating control — detective controls specifically identify and alert on security events."
    }
  },
  {
    "id": 26,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Detective",
    "difficulty": "medium",
    "text": "A security team deploys a file integrity monitoring (FIM) system that alerts whenever critical system files are modified outside of approved change windows. This control is BEST classified as:",
    "answers": [
      { "id": "a", "text": "Preventive — it stops unauthorized file modifications" },
      { "id": "b", "text": "Detective — it identifies and alerts on unauthorized or anomalous file changes after they occur" },
      { "id": "c", "text": "Corrective — it reverses unauthorized file changes" },
      { "id": "d", "text": "Deterrent — it discourages attackers from modifying files" }
    ],
    "correct": "b",
    "explanations": {
      "a": "FIM does not block file modifications — it detects and alerts on them after they have already occurred.",
      "b": "FIM is a detective control — it monitors file state and alerts when changes occur outside expected parameters, providing visibility into potential tampering. This is the correct answer.",
      "c": "Basic FIM alerts without restoring — corrective controls would reverse the changes. Advanced FIM with automatic restore would add a corrective function.",
      "d": "FIM operates silently in the background — attackers are generally unaware of it, limiting its deterrent value."
    }
  },
  {
    "id": 27,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Detective",
    "difficulty": "hard",
    "text": "An IDS detects a port scan against a web server and generates an alert. A security analyst reviews the alert 6 hours later. The attacker exploited a vulnerability identified during the scan 2 hours after the scan completed. What limitation of detective controls does this scenario illustrate?",
    "answers": [
      { "id": "a", "text": "Detective controls are ineffective and should be replaced with preventive controls only" },
      { "id": "b", "text": "Detective controls only provide value if monitoring is timely — an unreviewed alert provides no operational protection. Detection without response is insufficient. The gap between detection and response (6 hours review delay) allowed the attack to succeed. Effective detective controls require automated alerting, defined response times, and integration with response processes (SIEM + SOAR)" },
      { "id": "c", "text": "The IDS failed to function correctly — a working IDS would have blocked the scan" },
      { "id": "d", "text": "Port scans are not malicious and should not generate alerts" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Detective controls are essential for visibility — the problem is the response process, not the detective control category itself.",
      "b": "Detection without timely response leaves an exploitation window. The value of detective controls is fully realized only when they are paired with prompt analysis and response procedures. This is the correct answer.",
      "c": "An IDS detects — it does not block. Blocking is an IPS function. The IDS worked correctly by alerting.",
      "d": "Port scans are a standard pre-attack reconnaissance technique — they are appropriate IDS alert triggers."
    }
  },
  {
    "id": 28,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Detective",
    "difficulty": "hard",
    "text": "A SIEM is configured with 500 alert rules generating 800 alerts per day. Analysts review approximately 50 alerts per day. The remaining 750 go unreviewed. From a security controls perspective, what is the PRIMARY risk?",
    "answers": [
      { "id": "a", "text": "The SIEM is not a detective control since analysts cannot review all alerts" },
      { "id": "b", "text": "Alert fatigue and insufficient analyst capacity mean the detective control is effectively non-functional for 94% of generated alerts — real security incidents may be lost in unreviewed noise. The detective control provides coverage only in theory, not in practice" },
      { "id": "c", "text": "The risk is only to compliance — operationally the organization is fully protected" },
      { "id": "d", "text": "The solution is to generate more alerts to improve coverage" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The SIEM is a detective control — the issue is operational effectiveness, not control category classification.",
      "b": "A detective control that generates more alerts than analysts can review effectively provides false assurance — incidents can hide in unreviewed queues. Effective detection requires alert tuning, automation, and appropriate analyst capacity. This is the correct answer.",
      "c": "The risk is both operational and compliance — unreviewed security events represent real missed incidents, not just compliance gaps.",
      "d": "More alerts with insufficient review makes the problem worse — fewer, higher-fidelity alerts are needed."
    }
  },
  {
    "id": 29,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Corrective",
    "difficulty": "easy",
    "text": "Which of the following BEST describes a corrective security control?",
    "answers": [
      { "id": "a", "text": "A control that identifies security incidents through monitoring and alerting" },
      { "id": "b", "text": "A control that reduces the impact of a security incident after it has occurred by restoring systems, removing threats, or limiting ongoing damage" },
      { "id": "c", "text": "A control that prevents security incidents from occurring in the first place" },
      { "id": "d", "text": "A control that discourages attackers by demonstrating visible security measures" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Identifying incidents through monitoring describes detective controls — corrective controls act after detection.",
      "b": "Corrective controls respond to and remediate security incidents — restoring backups after ransomware, quarantining infected systems, patching exploited vulnerabilities, and revoking compromised credentials are all corrective. This is the correct answer.",
      "c": "Preventing incidents describes preventive controls — corrective controls respond after an incident has occurred.",
      "d": "Discouraging attackers describes deterrent controls — corrective controls act after an incident."
    }
  },
  {
    "id": 30,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Corrective",
    "difficulty": "medium",
    "text": "After detecting ransomware on a system, a security team isolates the infected machine, removes the malware, restores data from clean backups, and patches the vulnerability that was exploited. These response actions are BEST categorized as:",
    "answers": [
      { "id": "a", "text": "Preventive controls — they prevent the ransomware from spreading further" },
      { "id": "b", "text": "Corrective controls — they remediate the incident, restore normal operations, and address the root cause after the security event occurred" },
      { "id": "c", "text": "Detective controls — they identify what the ransomware did to the system" },
      { "id": "d", "text": "Compensating controls — they substitute for the failed preventive control" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Isolating the infected machine does prevent further spread — but the overall response set is corrective. Isolation can be both preventive (of spread) and corrective (responding to the incident), but the response process as a whole is corrective.",
      "b": "The incident response actions — isolate, remove, restore, patch — are corrective controls responding to and remediating an active security incident. This is the correct answer.",
      "c": "Detective controls identify the incident — these actions respond to an already-identified incident.",
      "d": "Compensating controls are alternatives to standard controls — incident response actions are primary corrective controls, not substitutes."
    }
  },
  {
    "id": 31,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Corrective",
    "difficulty": "hard",
    "text": "An organization's EDR solution automatically quarantines a process exhibiting ransomware behavior — encrypting files at an unusual rate — before significant encryption occurs. How should this automated quarantine be classified?",
    "answers": [
      { "id": "a", "text": "Preventive only — it stopped the encryption" },
      { "id": "b", "text": "The automated quarantine is both corrective (responding to and containing an identified security incident — the EDR already detected malicious activity and is now limiting damage) and has a preventive effect (stopping further encryption). The primary classification is corrective since it responds to an active, identified threat rather than blocking a potential one" },
      { "id": "c", "text": "Managerial — an analyst decided to quarantine the process" },
      { "id": "d", "text": "Physical — the system was isolated from the network" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Preventive controls stop threats before detection — by the time EDR quarantines a process, the threat has been detected and the control is responding to it, making it primarily corrective.",
      "b": "The distinction matters: the EDR detected ransomware behavior (detective), then quarantined it in response (corrective with preventive effect on further damage). Automated incident response after detection is corrective. This is the correct answer.",
      "c": "The automated quarantine was performed by the EDR system without analyst action — making it technical, not managerial.",
      "d": "Automated process quarantine is a software mechanism — not a physical control."
    }
  },
  {
    "id": 32,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Corrective",
    "difficulty": "hard",
    "text": "A backup system enables restoration of encrypted files after a ransomware attack. The backup was not encrypted by the ransomware because it was stored offline. From a control perspective, the backup serves as BOTH a corrective control AND which other control type?",
    "answers": [
      { "id": "a", "text": "Deterrent — backups discourage ransomware attacks" },
      { "id": "b", "text": "Compensating — the backup compensates for the failure of preventive controls (antimalware, patching) that allowed the ransomware to execute. It is also corrective because it restores operations after the incident" },
      { "id": "c", "text": "Detective — the backup detects when files have been encrypted" },
      { "id": "d", "text": "Directive — the backup directs employees on proper file storage" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Backups do not meaningfully deter ransomware attackers — some ransomware specifically targets accessible backups.",
      "b": "Backups are corrective (restore operations after incidents) and compensating (provide recovery when preventive controls fail to stop ransomware). Both classifications are valid and commonly cited for backup controls. This is the correct answer.",
      "c": "Backups do not detect file encryption — that is a FIM or EDR function.",
      "d": "Directive controls provide instructions — backups are a technical mechanism, not guidance."
    }
  },
  {
    "id": 33,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Compensating",
    "difficulty": "easy",
    "text": "Which of the following BEST describes a compensating security control?",
    "answers": [
      { "id": "a", "text": "A control that detects security incidents through active monitoring" },
      { "id": "b", "text": "An alternative control implemented when the preferred control is not feasible — providing an equivalent or sufficient level of protection given the specific circumstances" },
      { "id": "c", "text": "A control that automatically remediates security incidents" },
      { "id": "d", "text": "A control category that includes all physical security measures" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Active monitoring describes detective controls — compensating controls are alternatives to standard controls, not a monitoring function.",
      "b": "Compensating controls are deployed when a standard control cannot be implemented — they provide equivalent protection through alternative means. PCI DSS explicitly recognizes compensating controls for requirements that cannot be met directly. This is the correct answer.",
      "c": "Automatic remediation describes corrective controls — compensating controls substitute for required controls, not specifically for remediation.",
      "d": "Physical security is a control category — compensating controls span all categories and are defined by their role as alternatives, not by what they protect."
    }
  },
  {
    "id": 34,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Compensating",
    "difficulty": "medium",
    "text": "A legacy industrial control system (ICS) cannot be patched due to vendor support constraints and operational requirements. The security team cannot apply the standard patching control. Which combination of compensating controls BEST addresses this risk?",
    "answers": [
      { "id": "a", "text": "Accept the risk — compensating controls are not effective for unpatched systems" },
      { "id": "b", "text": "Network isolation (air gap or strict VLAN segmentation), enhanced monitoring of all ICS traffic, additional host-based controls where possible, strict access control requiring MFA for any connection, and formal documented risk acceptance — together compensating for the inability to patch" },
      { "id": "c", "text": "Replace the ICS with a modern system immediately" },
      { "id": "d", "text": "Inform regulators that patching is impossible and request an exemption from all security requirements" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Compensating controls are specifically designed for situations like this — accepting risk without compensating controls is irresponsible.",
      "b": "Layered compensating controls reduce the exploitability and impact of the unpatched system: isolation limits attack paths, monitoring provides detection, access control reduces unauthorized access, and documentation provides compliance evidence. This is the correct answer.",
      "c": "Immediate replacement may not be operationally feasible — compensating controls bridge the security gap until replacement is possible.",
      "d": "Regulatory exemptions are not blanket waivers — compensating controls must still be documented and implemented."
    }
  },
  {
    "id": 35,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Compensating",
    "difficulty": "hard",
    "text": "A PCI DSS QSA (Qualified Security Assessor) reviews a compensating control submitted for Requirement 8.3.6 (password complexity minimum). The organization uses a short PIN (4 digits) combined with mandatory biometric authentication. The QSA must determine if this compensating control is acceptable. What criteria MUST the compensating control meet?",
    "answers": [
      { "id": "a", "text": "Any alternative control is acceptable as long as the organization documents it" },
      { "id": "b", "text": "PCI DSS requires compensating controls to: (1) meet the intent and rigor of the original requirement, (2) provide a similar level of defense as the original control, (3) be above and beyond other PCI DSS requirements, and (4) be commensurate with the additional risk imposed. The PIN+biometrics combination may meet these criteria since biometrics address the identity verification intent with greater rigor than a complex password alone" },
      { "id": "c", "text": "The compensating control is automatically rejected since any deviation from PCI DSS requirements is not allowed" },
      { "id": "d", "text": "The QSA must accept any compensating control submitted by the organization" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Documentation is necessary but not sufficient — compensating controls must provide equivalent or superior protection to the original requirement.",
      "b": "PCI DSS has specific criteria for compensating controls: meeting original intent, providing equivalent defense, being above other requirements, and commensurate with additional risk. Biometric authentication may satisfy the identity verification intent of complex passwords. This is the correct answer.",
      "c": "PCI DSS explicitly allows compensating controls through a defined evaluation process — it is not prohibited.",
      "d": "QSAs must evaluate compensating controls against defined criteria — they are not obligated to accept all submissions."
    }
  },
  {
    "id": 36,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Compensating",
    "difficulty": "hard",
    "text": "An organization implements enhanced logging and monitoring as a compensating control for a vulnerability that cannot be immediately patched due to business constraints. A security reviewer argues that monitoring is a detective control and cannot compensate for a missing preventive control. Is this argument valid?",
    "answers": [
      { "id": "a", "text": "Yes — compensating controls must always be the same type as the control they replace" },
      { "id": "b", "text": "No — compensating controls can be of a different type than the control they replace, as long as they provide equivalent overall risk reduction. Enhanced monitoring does not prevent exploitation but reduces the risk by ensuring rapid detection and response, shortening the exploitation window. Whether this is 'equivalent' depends on the specific risk assessment" },
      { "id": "c", "text": "Yes — detective controls never compensate for preventive controls under any framework" },
      { "id": "d", "text": "The argument is irrelevant — compensating controls do not need to reduce the same risk as the original control" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Compensating controls are not required to be the same type — they must provide equivalent risk reduction, which can come from multiple control types working together.",
      "b": "A detective control can compensate for a missing preventive control if it provides equivalent risk management — through early detection and rapid response limiting exploitation impact. Whether equivalence is achieved requires specific risk analysis. This is the correct answer.",
      "c": "No framework absolutely prohibits detective controls as compensating measures — equivalent risk reduction, not type matching, is the criterion.",
      "d": "Compensating controls must address the same underlying risk — they are specifically defined as providing equivalent risk reduction for the risk the original control was meant to address."
    }
  },
  {
    "id": 37,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Directive",
    "difficulty": "easy",
    "text": "Which of the following BEST describes a directive security control?",
    "answers": [
      { "id": "a", "text": "A control that automatically blocks unauthorized access attempts" },
      { "id": "b", "text": "A control that specifies required behaviors, actions, or configuration settings through policies, regulations, standards, or instructions — directing what must be done to maintain security" },
      { "id": "c", "text": "A control that monitors systems for security anomalies" },
      { "id": "d", "text": "A control that restores systems after a security incident" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Automatically blocking unauthorized access describes preventive technical controls — directive controls specify required actions without enforcing them technically.",
      "b": "Directive controls provide instructions, policies, and mandates — they tell people what to do (acceptable use policies, security procedures, compliance requirements) rather than technically enforcing or automatically detecting. This is the correct answer.",
      "c": "Monitoring for anomalies describes detective controls — directive controls provide direction, not monitoring.",
      "d": "Restoring systems describes corrective controls — directive controls direct behavior, not restoration."
    }
  },
  {
    "id": 38,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Directive",
    "difficulty": "medium",
    "text": "An organization publishes a password policy requiring passwords to be at least 12 characters, use complexity requirements, and be changed every 90 days. The policy is documented and employees must acknowledge it. This policy is BEST classified as which control type?",
    "answers": [
      { "id": "a", "text": "Preventive — it prevents weak passwords" },
      { "id": "b", "text": "Detective — it identifies employees using weak passwords" },
      { "id": "c", "text": "Directive — it specifies required password behavior through documented policy that employees must follow" },
      { "id": "d", "text": "Technical — it enforces password complexity through a system" }
    ],
    "correct": "c",
    "explanations": {
      "a": "The policy itself does not technically prevent weak passwords — if it is enforced by a technical system, that system is preventive, but the policy document is directive.",
      "b": "The policy does not detect weak passwords — a password auditing tool would be detective.",
      "c": "A documented password policy directing required behaviors is a directive control — it specifies what must be done through written requirements. When a system enforces the policy, that system becomes a preventive technical control. The policy document itself is directive. This is the correct answer.",
      "d": "If a technical system enforces complexity, that system is a technical preventive control — the policy document directing the requirement is directive."
    }
  },
  {
    "id": 39,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Directive",
    "difficulty": "hard",
    "text": "An organization relies on GDPR Articles 5 and 32 compliance requirements to direct their data encryption practices. These regulatory requirements function as which type of security control for the organization?",
    "answers": [
      { "id": "a", "text": "Technical preventive — regulations technically enforce encryption" },
      { "id": "b", "text": "Directive — external regulatory requirements direct organizations on what security practices must be implemented. The regulation specifies required behavior but relies on organizations to technically implement the required controls" },
      { "id": "c", "text": "Detective — regulations detect when organizations fail to encrypt data" },
      { "id": "d", "text": "Compensating — regulations substitute for internal security policies" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Regulations do not technically enforce encryption — they direct organizations to implement encryption and impose penalties for non-compliance.",
      "b": "Regulatory requirements are directive controls — they specify what organizations must do through legal mandates. The organization must then implement technical controls to meet the directive requirements. This is the correct answer.",
      "c": "Regulators may audit and detect non-compliance — but the regulations themselves are directive, not detective controls.",
      "d": "Regulations are primary directives, not substitutes for other controls — they establish what must be done."
    }
  },
  {
    "id": 40,
    "domain": "1.0",
    "objective": "1.1",
    "keyword": "Directive",
    "difficulty": "hard",
    "text": "A security team notes that directive controls (policies, procedures) are frequently listed as the weakest link in security programs. An attacker exploits a system by circumventing a password policy — the user shared their password despite the policy prohibiting it. What does this illustrate about directive controls and what additional controls address this gap?",
    "answers": [
      { "id": "a", "text": "Directive controls are useless and should be replaced entirely with technical controls" },
      { "id": "b", "text": "Directive controls specify required behavior but cannot technically enforce it — they depend on human compliance. This gap is addressed by layering technical controls (that enforce the directive) alongside directive controls. In this case: technical password sharing prevention (system prevents displaying passwords), MFA (makes shared passwords insufficient alone), and monitoring (detects shared credential use from unusual locations)" },
      { "id": "c", "text": "The user should be terminated — this is purely a human failure requiring no control changes" },
      { "id": "d", "text": "More detailed password policies would have prevented this incident" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Directive controls establish the legal, governance, and cultural foundation — technical controls enforce specific requirements but cannot replace the governance framework.",
      "b": "Directive controls are necessary but not sufficient — they require technical controls for enforcement. Layering technical controls on top of directive controls provides the compliance assurance that directives alone cannot. This is the correct answer.",
      "c": "Individual accountability is important but addressing only human failure while leaving the control gap open invites future incidents.",
      "d": "More detailed policies still rely on human compliance — without technical enforcement, detail does not prevent the behavior."
    }
  },
  {
    "id": 41,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "CIA",
    "difficulty": "easy",
    "text": "A hospital database containing patient records is encrypted so only authorized clinicians can read it. Which element of the CIA triad does encryption PRIMARILY support in this scenario?",
    "answers": [
      { "id": "a", "text": "Integrity — encryption ensures records cannot be altered" },
      { "id": "b", "text": "Availability — encryption ensures records are always accessible" },
      { "id": "c", "text": "Confidentiality — encryption ensures only authorized parties can read the patient data" },
      { "id": "d", "text": "Accountability — encryption ensures actions are traceable" }
    ],
    "correct": "c",
    "explanations": {
      "a": "Encryption can support integrity through authenticated encryption modes, but its primary role here is preventing unauthorized reading — confidentiality.",
      "b": "Encryption does not improve availability — it could reduce availability if keys are lost.",
      "c": "Confidentiality ensures data is accessible only to authorized parties. Encrypting patient records so only authorized clinicians can read them directly supports confidentiality. This is the correct answer.",
      "d": "Accountability relates to logging and audit trails — not encryption."
    }
  },
  {
    "id": 42,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "CIA",
    "difficulty": "medium",
    "text": "A ransomware attack encrypts all files on a company's file server, making them inaccessible to employees. Which element of the CIA triad is PRIMARILY violated?",
    "answers": [
      { "id": "a", "text": "Confidentiality — the attacker can now read all company files" },
      { "id": "b", "text": "Integrity — the attacker modified the files by encrypting them" },
      { "id": "c", "text": "Availability — legitimate users can no longer access the files they need" },
      { "id": "d", "text": "Non-repudiation — the attacker cannot be identified" }
    ],
    "correct": "c",
    "explanations": {
      "a": "The attacker encrypts files — they do not necessarily read or expose the original contents. Confidentiality may also be violated if data is exfiltrated, but inaccessibility is the primary impact described.",
      "b": "The files are encrypted but not necessarily corrupted in terms of content integrity — availability is the primary violation when legitimate access is denied.",
      "c": "Availability ensures authorized users can access resources when needed. Ransomware denying access to files is a direct availability attack. This is the correct answer.",
      "d": "Non-repudiation is about proof of actions — it is not a CIA triad element."
    }
  },
  {
    "id": 43,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "CIA",
    "difficulty": "hard",
    "text": "An attacker performs a man-in-the-middle attack, intercepting financial transaction data and modifying the transaction amounts before forwarding them to the receiving bank. Which elements of the CIA triad are violated, and which is MOST directly impacted?",
    "answers": [
      { "id": "a", "text": "Only availability — the transactions are delayed by the interception" },
      { "id": "b", "text": "Confidentiality is violated (attacker reads the transactions) and integrity is violated (amounts are modified). Integrity is MOST directly impacted because the data reaching the destination is different from what was sent — the fundamental accuracy and trustworthiness of the data is compromised" },
      { "id": "c", "text": "Only confidentiality — the attacker reads the transaction data" },
      { "id": "d", "text": "All three — the attack also causes availability issues for the banking system" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Availability is not the primary concern — the transactions reach the destination (modified), so availability is largely maintained.",
      "b": "The MITM attack violates confidentiality (reading data) and integrity (modifying data). Integrity is the most direct violation — the receiving bank receives fraudulent transaction amounts that differ from what was sent. This is the correct answer.",
      "c": "Confidentiality is violated, but modification of amounts means integrity is also violated — and is the more critical impact.",
      "d": "Availability is not significantly impacted if transactions still reach the bank (albeit modified)."
    }
  },
  {
    "id": 44,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "CIA",
    "difficulty": "hard",
    "text": "A security architect must balance all three CIA properties for an online banking system. Adding more encryption layers improves confidentiality but increases latency, potentially reducing availability during peak loads. This illustrates which fundamental security challenge?",
    "answers": [
      { "id": "a", "text": "CIA properties are always complementary — improving one always improves the others" },
      { "id": "b", "text": "CIA properties sometimes create trade-offs — security controls strengthening one property can negatively affect another. Security architects must balance these tensions based on risk appetite and business requirements" },
      { "id": "c", "text": "Confidentiality is always the most important CIA property and should never be sacrificed" },
      { "id": "d", "text": "The CIA triad is outdated — modern systems do not need to balance these properties" }
    ],
    "correct": "b",
    "explanations": {
      "a": "CIA properties frequently create tensions — stronger encryption improves confidentiality but adds processing overhead affecting availability.",
      "b": "CIA trade-offs are a fundamental security architecture challenge. Excessive confidentiality controls can hurt availability; highly available systems may sacrifice some confidentiality through caching. Architects must balance based on the system's risk profile. This is the correct answer.",
      "c": "The relative importance of CIA properties is system-dependent — a hospital may prioritize availability (life-critical systems) while a defense contractor may prioritize confidentiality.",
      "d": "The CIA triad remains a foundational framework — modern security frameworks extend it but do not replace it."
    }
  },
  {
    "id": 45,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Non-repudiation",
    "difficulty": "easy",
    "text": "Which of the following BEST describes non-repudiation in information security?",
    "answers": [
      { "id": "a", "text": "Ensuring that only authorized users can access sensitive data" },
      { "id": "b", "text": "Providing proof that an action or communication was performed by a specific party, so they cannot later deny having done it" },
      { "id": "c", "text": "Ensuring data remains unaltered during transmission" },
      { "id": "d", "text": "Making systems available when needed by authorized users" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Ensuring only authorized users access data describes confidentiality and access control — not non-repudiation.",
      "b": "Non-repudiation provides cryptographic or audit-based proof that a specific party performed an action — they cannot credibly deny sending a message or performing a transaction. Digital signatures are the primary technical mechanism. This is the correct answer.",
      "c": "Ensuring data remains unaltered describes integrity — non-repudiation proves who performed an action.",
      "d": "Ensuring systems are available describes availability — non-repudiation is about accountability for actions."
    }
  },
  {
    "id": 46,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Non-repudiation",
    "difficulty": "medium",
    "text": "A company requires employees to digitally sign all expense reports using their personal PKI certificates. An employee later claims they never submitted a particular expense report. How does the digital signature support non-repudiation?",
    "answers": [
      { "id": "a", "text": "The digital signature proves the document was encrypted, so only the employee could have sent it" },
      { "id": "b", "text": "The digital signature was created using the employee's private key, which only they possess. The signature can be verified with their public key, proving the document was signed by the certificate holder. The employee cannot credibly deny signing it without claiming their private key was compromised" },
      { "id": "c", "text": "Digital signatures only prove document integrity, not the identity of the signer" },
      { "id": "d", "text": "Non-repudiation requires a witness — digital signatures alone are insufficient" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Digital signatures use asymmetric cryptography — the private key signs, but encryption and signing are different operations.",
      "b": "The private key used for signing is unique to the certificate holder. A valid signature verifiable with the holder's public key proves they signed it — non-repudiation is established. This is the correct answer.",
      "c": "Digital signatures provide both integrity (document unchanged) and non-repudiation (signed by key holder) — not just integrity.",
      "d": "Digital signatures provide technical non-repudiation without human witnesses — the cryptographic proof stands independently."
    }
  },
  {
    "id": 47,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Non-repudiation",
    "difficulty": "hard",
    "text": "An organization implements comprehensive audit logging, capturing all user actions with timestamps and username attribution. An employee attempts to deny deleting a critical record, claiming someone else must have used their account. The logs show the deletion was performed from the employee's authenticated session. What limitations of log-based non-repudiation does this scenario highlight?",
    "answers": [
      { "id": "a", "text": "Logs provide perfect non-repudiation and the employee's denial is impossible to sustain" },
      { "id": "b", "text": "Log-based non-repudiation has a credential-sharing weakness — if account credentials were shared or compromised, the log accurately records the session but cannot prove who was physically using the authenticated session. True non-repudiation requires combining logs with stronger authentication (MFA, biometrics) and physical controls to close this gap" },
      { "id": "c", "text": "Audit logs are inadmissible as evidence and provide no non-repudiation value" },
      { "id": "d", "text": "The employee's denial is valid — logs are routinely manipulated and cannot be trusted" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Logs prove what the account did — not who was using the account. Credential sharing or compromise weakens the non-repudiation value.",
      "b": "Log attribution depends on authentication quality — if credentials can be shared or compromised, logs attribute actions to the account, not necessarily the person. MFA and biometrics strengthen the link between authentication and physical identity. This is the correct answer.",
      "c": "Audit logs are admissible in legal proceedings and are a primary non-repudiation mechanism — especially when combined with integrity protection (WORM storage, cryptographic signing).",
      "d": "Properly protected audit logs (WORM, cryptographic integrity verification) are trusted evidence — the concern is attribution quality, not log authenticity."
    }
  },
  {
    "id": 48,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Non-repudiation",
    "difficulty": "hard",
    "text": "A financial institution requires non-repudiation for all wire transfers over $10,000. Which combination of technical controls provides the STRONGEST non-repudiation for this requirement?",
    "answers": [
      { "id": "a", "text": "Username and password authentication with audit logging" },
      { "id": "b", "text": "Multi-factor authentication (requiring physical token + PIN) combined with digital signatures applied to each transaction using the user's HSM-protected private key, immutable timestamped audit logs, and video surveillance of the transaction terminal" },
      { "id": "c", "text": "SSL/TLS encryption of all wire transfer communications" },
      { "id": "d", "text": "Role-based access control limiting who can initiate wire transfers" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Password authentication is weak for non-repudiation — passwords can be shared and logs only prove account activity, not individual identity.",
      "b": "The combination provides layered non-repudiation: MFA with physical token strengthens identity proof, HSM-protected digital signatures cryptographically bind the transaction to the key holder, immutable logs provide tamper-evident records, and video surveillance provides physical evidence. This is the correct answer.",
      "c": "TLS encrypts communications providing confidentiality — it does not provide non-repudiation of the transaction itself.",
      "d": "RBAC controls who can perform actions — it does not prove who actually performed a specific action (non-repudiation)."
    }
  },
  {
    "id": 49,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "AAA",
    "difficulty": "easy",
    "text": "A user enters their username and password to access a corporate VPN. After authentication, the system checks whether the user is permitted to access specific internal resources. Their VPN session activities are recorded. Which AAA components are demonstrated in sequence?",
    "answers": [
      { "id": "a", "text": "Authorization, Authentication, Accounting" },
      { "id": "b", "text": "Authentication (username/password verification), Authorization (checking permitted resource access), Accounting (recording session activities)" },
      { "id": "c", "text": "Accounting, Authorization, Authentication" },
      { "id": "d", "text": "Authentication, Accounting, Authorization" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Authorization cannot occur before authentication — identity must be verified before permissions can be evaluated.",
      "b": "AAA follows a defined sequence: Authentication verifies identity (who are you?), Authorization determines permissions (what can you do?), Accounting records activity (what did you do?). This is the correct answer.",
      "c": "Accounting occurs after authentication and authorization — this ordering is incorrect.",
      "d": "Accounting records what authorized users do — it follows authorization, not the other way around."
    }
  },
  {
    "id": 50,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "AAA",
    "difficulty": "medium",
    "text": "A RADIUS server is deployed to manage wireless network access. When a user connects, RADIUS verifies credentials against Active Directory, grants access to a specific VLAN based on group membership, and logs connection details including duration and bytes transferred. Which RADIUS functions map to Authentication, Authorization, and Accounting respectively?",
    "answers": [
      { "id": "a", "text": "VLAN assignment, credential verification, session logging" },
      { "id": "b", "text": "Credential verification against AD (Authentication), VLAN assignment based on group membership (Authorization), logging connection details (Accounting)" },
      { "id": "c", "text": "Session logging, VLAN assignment, credential verification" },
      { "id": "d", "text": "RADIUS performs only authentication — VLANs and logging are separate systems" }
    ],
    "correct": "b",
    "explanations": {
      "a": "This incorrectly maps functions — VLAN assignment is authorization, not authentication.",
      "b": "RADIUS AAA: credentials checked against AD is Authentication, VLAN assignment based on AD group is Authorization, and logging connection duration/bytes is Accounting. This is the correct answer.",
      "c": "This ordering reverses the correct sequence — authentication must precede both authorization and accounting.",
      "d": "RADIUS is a full AAA protocol — it handles authentication, authorization attribute assignment, and accounting (session records) in a single framework."
    }
  },
  {
    "id": 51,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "AAA",
    "difficulty": "hard",
    "text": "An organization uses TACACS+ for network device access. Compared to RADIUS, what is the PRIMARY security advantage of TACACS+ for this use case?",
    "answers": [
      { "id": "a", "text": "TACACS+ is faster than RADIUS, reducing authentication latency" },
      { "id": "b", "text": "TACACS+ separates Authentication, Authorization, and Accounting into distinct transactions and encrypts the entire packet payload (not just the password). This allows granular per-command authorization on network devices and provides more comprehensive encryption, making it better suited for administrative device access" },
      { "id": "c", "text": "TACACS+ uses UDP while RADIUS uses TCP, providing better reliability" },
      { "id": "d", "text": "TACACS+ is an open standard while RADIUS is proprietary" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Performance is not the primary security differentiator — TACACS+ is often slightly slower due to full packet encryption.",
      "b": "TACACS+ separates AAA into discrete exchanges (enabling granular authorization) and encrypts the full packet body. For network device access, per-command authorization is critical — administrators can be restricted to specific commands. This is the correct answer.",
      "c": "This is reversed — TACACS+ uses TCP (reliable), RADIUS uses UDP (less overhead but less reliable).",
      "d": "Both TACACS+ (Cisco-extended, now open) and RADIUS (RFC standard) have open specifications — this is not a meaningful differentiator."
    }
  },
  {
    "id": 52,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "AAA",
    "difficulty": "hard",
    "text": "An employee is authenticated but attempts to access a file they are not authorized to view. The system denies access and logs the attempt. From an AAA perspective, at which component did the security control prevent unauthorized access, and what did the third component record?",
    "answers": [
      { "id": "a", "text": "Authentication prevented the access; Authorization recorded the attempt" },
      { "id": "b", "text": "Authorization enforced the permission boundary and prevented the unauthorized access. Accounting recorded the failed access attempt, the username, resource requested, timestamp, and outcome — providing an audit trail of the authorization violation" },
      { "id": "c", "text": "Accounting prevented the access; Authentication recorded the attempt" },
      { "id": "d", "text": "Authentication and Authorization both prevented access simultaneously" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Authentication already succeeded (the user is authenticated) — the unauthorized access attempt was stopped by Authorization, not Authentication.",
      "b": "Authorization is the component that enforces what an authenticated user can do. The failed access attempt is recorded by Accounting — providing the audit trail needed to detect authorization violations. This is the correct answer.",
      "c": "Accounting records events — it does not enforce access controls. This ordering is incorrect.",
      "d": "Authentication already completed successfully — Authorization is the component that denied the specific resource access."
    }
  },
  {
    "id": 53,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Gap analysis",
    "difficulty": "easy",
    "text": "A security team compares their current security controls against the NIST Cybersecurity Framework requirements and identifies 12 controls they have not yet implemented. This process is BEST described as:",
    "answers": [
      { "id": "a", "text": "A penetration test — testing the effectiveness of existing controls" },
      { "id": "b", "text": "A gap analysis — identifying the difference between the current security posture and the desired or required state" },
      { "id": "c", "text": "A risk assessment — quantifying the probability and impact of security threats" },
      { "id": "d", "text": "A vulnerability scan — identifying technical vulnerabilities in systems" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Penetration testing actively exploits vulnerabilities — it does not compare controls to frameworks.",
      "b": "Gap analysis identifies the delta between current state and desired/required state — comparing existing controls to NIST CSF and finding missing controls is a textbook gap analysis. This is the correct answer.",
      "c": "Risk assessment evaluates probability and impact of specific threats — not a framework compliance comparison.",
      "d": "Vulnerability scanning identifies technical weaknesses — not control framework compliance gaps."
    }
  },
  {
    "id": 54,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Gap analysis",
    "difficulty": "medium",
    "text": "A financial services organization must comply with PCI DSS. They conduct a gap analysis and discover they have implemented 85% of PCI DSS requirements but lack network segmentation between cardholder data environments and corporate networks. How does identifying this gap support the organization?",
    "answers": [
      { "id": "a", "text": "It confirms the organization is already compliant since 85% is a passing threshold" },
      { "id": "b", "text": "Identifying the network segmentation gap allows the organization to prioritize remediation before an audit, understand the compliance risk, quantify remediation effort, and prevent potential PCI DSS violations and associated fines — the gap analysis provides actionable intelligence for security improvement" },
      { "id": "c", "text": "Gap analysis results are confidential and should not be shared with leadership" },
      { "id": "d", "text": "The gap only matters if a breach occurs — until then it has no practical impact" }
    ],
    "correct": "b",
    "explanations": {
      "a": "PCI DSS requires full compliance — there is no passing percentage. The missing network segmentation is a significant gap.",
      "b": "Gap analysis translates finding gaps into actionable remediation priorities — identifying the missing segmentation before an audit prevents compliance failure, fines, and potential breach exposure. This is the correct answer.",
      "c": "Gap analysis results should be shared with leadership to drive resource allocation for remediation — they are essential for informed security investment decisions.",
      "d": "Compliance gaps create real risk before any breach occurs — they indicate active exposure to threats and regulatory violations."
    }
  },
  {
    "id": 55,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Gap analysis",
    "difficulty": "hard",
    "text": "A gap analysis reveals that an organization's incident response capability scores 2 out of 5 against NIST CSF Respond function requirements. The organization's leadership asks how to interpret this score and what it means for business risk. What is the MOST accurate interpretation?",
    "answers": [
      { "id": "a", "text": "A score of 2/5 means the organization is 40% secure and will fail 60% of incidents" },
      { "id": "b", "text": "A score of 2/5 indicates significant maturity gaps in incident response capabilities — the organization likely lacks documented response plans, trained response teams, tested procedures, or integration with threat intelligence. This means security incidents will take longer to detect, contain, and remediate, increasing the business impact (costs, downtime, data loss) when breaches occur" },
      { "id": "c", "text": "The score is irrelevant — all organizations eventually achieve perfect incident response through experience" },
      { "id": "d", "text": "A 2/5 score means 20% of incidents will be successfully handled" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Maturity scores are not linear probability metrics — they indicate capability development level, not a percentage of incidents handled.",
      "b": "A low maturity score translates to longer response times, missed indicators, incomplete containment, and greater business impact during incidents. The business risk is extended breach duration and impact, not a fixed percentage of failure. This is the correct answer.",
      "c": "Incident response maturity requires deliberate development — experience alone without systematic improvement does not achieve capability maturity.",
      "d": "Maturity scores do not directly correlate to incident handling percentages — they indicate process and capability development level."
    }
  },
  {
    "id": 56,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Zero Trust",
    "difficulty": "easy",
    "text": "Which statement BEST describes the core principle of Zero Trust security?",
    "answers": [
      { "id": "a", "text": "All traffic within the corporate network perimeter is trusted and does not require authentication" },
      { "id": "b", "text": "No user, device, or network location is inherently trusted — every access request must be continuously verified regardless of whether it originates inside or outside the traditional network perimeter" },
      { "id": "c", "text": "External traffic is untrusted but internal traffic from corporate devices is always trusted" },
      { "id": "d", "text": "Zero Trust applies only to cloud environments — on-premises networks maintain implicit trust" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Implicit trust within the perimeter is the traditional model Zero Trust explicitly rejects — insider threats and lateral movement exploit this assumption.",
      "b": "Zero Trust's core principle is 'never trust, always verify' — authentication and authorization are required for every access request regardless of origin. This is the correct answer.",
      "c": "Zero Trust eliminates the concept of trusted internal networks — even corporate devices on the internal network must continuously verify identity and authorization.",
      "d": "Zero Trust applies to all environments — cloud, on-premises, and hybrid. The principle transcends deployment model."
    }
  },
  {
    "id": 57,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Zero Trust",
    "difficulty": "medium",
    "text": "In a Zero Trust architecture, what is the role of the Policy Engine?",
    "answers": [
      { "id": "a", "text": "The Policy Engine physically enforces access control at network boundaries" },
      { "id": "b", "text": "The Policy Engine makes access decisions by evaluating the current trust level of subjects (users, devices) against defined policies — considering identity, device health, location, and behavioral factors to grant, deny, or conditionally permit access" },
      { "id": "c", "text": "The Policy Engine manages user account provisioning and password resets" },
      { "id": "d", "text": "The Policy Engine is the component that users interact with directly to request access" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Physical enforcement at network boundaries describes traditional perimeter security — the Policy Engine is a logical decision-making component in Zero Trust.",
      "b": "The Policy Engine is the brain of the Zero Trust control plane — it evaluates trust signals (identity, device compliance, risk scores) against policies and makes the trust decision communicated to the Policy Administrator. This is the correct answer.",
      "c": "User account management is an identity governance function — not the Policy Engine's role.",
      "d": "Users interact with the Policy Enforcement Point — the Policy Engine is a backend decision engine."
    }
  },
  {
    "id": 58,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Zero Trust",
    "difficulty": "hard",
    "text": "A Zero Trust implementation includes the Policy Enforcement Point (PEP). A user requests access to an application. The Policy Engine grants conditional access requiring MFA re-authentication. How does the PEP interact with this decision in the Zero Trust data plane?",
    "answers": [
      { "id": "a", "text": "The PEP overrides the Policy Engine's decision if the user has previously been authenticated" },
      { "id": "b", "text": "The PEP acts as the access gateway — it enforces the Policy Engine's decision by requiring MFA re-authentication before permitting the application access request. The PEP sits between subjects and resources, enforcing conditional access decisions from the control plane in real time" },
      { "id": "c", "text": "The PEP makes independent access decisions without consulting the Policy Engine" },
      { "id": "d", "text": "The PEP logs access attempts but does not enforce the Policy Engine's decisions" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The PEP enforces Policy Engine decisions — it cannot override them. Previous authentication does not bypass the current conditional access requirement.",
      "b": "The PEP is the enforcement mechanism in the data plane — it receives trust decisions from the Policy Engine (via Policy Administrator) and enforces them by permitting, denying, or conditioning access in real time. This is the correct answer.",
      "c": "The PEP enforces but does not make independent policy decisions — that is the Policy Engine's role.",
      "d": "The PEP actively enforces access decisions — it is more than a logging mechanism."
    }
  },
  {
    "id": 59,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Physical security",
    "difficulty": "easy",
    "text": "A security team installs concrete barriers in front of a data center entrance to prevent vehicles from ramming through the facility entrance. These barriers are BEST described as:",
    "answers": [
      { "id": "a", "text": "Fencing — they establish a security perimeter" },
      { "id": "b", "text": "Bollards — short, sturdy posts designed to prevent vehicle access while allowing pedestrian passage" },
      { "id": "c", "text": "Access control vestibules — they control who enters the facility" },
      { "id": "d", "text": "Sensors — they detect unauthorized vehicles approaching" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Fencing creates a perimeter barrier — bollards are vehicle-impact-specific barriers, not perimeter fencing.",
      "b": "Bollards are short, sturdy posts (concrete or steel) specifically designed to stop vehicle attacks — protecting building entrances from vehicle-ramming attacks while allowing pedestrian access. This is the correct answer.",
      "c": "Access control vestibules control pedestrian entry — bollards specifically address vehicle threats.",
      "d": "Sensors detect — bollards physically prevent. These serve different functions."
    }
  },
  {
    "id": 60,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Physical security",
    "difficulty": "medium",
    "text": "A secure facility uses an access control vestibule (mantrap) at all entrances. An employee holds the door open for a colleague who forgot their badge. What security principle is violated, and which control directly addresses this?",
    "answers": [
      { "id": "a", "text": "No violation occurs — helping colleagues is acceptable in secure facilities" },
      { "id": "b", "text": "Tailgating violates the access control policy requiring individual authentication. The mantrap directly addresses this by ensuring only one door can be open at a time — if tailgating is detected (weight sensors, cameras, or dual door logic), the inner door will not open, physically preventing unauthorized entry" },
      { "id": "c", "text": "The violation is a confidentiality issue — the employee shared their badge" },
      { "id": "d", "text": "The violation is an integrity issue — badge data was compromised" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Tailgating is a physical security violation — secure facilities require individual authentication for accountability and access control.",
      "b": "Tailgating bypasses individual authentication. Mantraps (access control vestibules) physically prevent tailgating by interlocking doors — the inner door only opens after the outer door closes and the individual authenticates. This is the correct answer.",
      "c": "No badge was shared — physical tailgating bypasses the need for a badge by following an authorized person through.",
      "d": "Badge data integrity is not the concern — unauthorized physical access through social engineering is."
    }
  },
  {
    "id": 61,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Physical security",
    "difficulty": "hard",
    "text": "A security team designs physical security for a new data center. They must select sensor types for different zones. The loading dock requires detection of large vehicles. Server rooms need detection of human presence without triggering on HVAC airflow. Parking areas need motion detection that works in complete darkness. Which sensor types BEST match each requirement?",
    "answers": [
      { "id": "a", "text": "Infrared for all three locations — IR works universally" },
      { "id": "b", "text": "Loading dock: microwave sensors (detect large metal mass/movement through walls/barriers); server rooms: pressure sensors on floor tiles (detect human weight without triggering on air movement); parking areas: infrared motion sensors (detect body heat regardless of lighting conditions)" },
      { "id": "c", "text": "Ultrasonic for loading docks, infrared for server rooms, pressure for parking" },
      { "id": "d", "text": "Camera systems replace all sensor types with AI-based detection" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Infrared works for many applications but is not optimal for all three scenarios — particularly for detecting large vehicles through barriers or for weight-based human detection.",
      "b": "Microwave sensors penetrate barriers and detect large metal masses — suitable for loading docks. Pressure sensors detect weight — human presence without HVAC air triggering false positives. Infrared detects body heat in complete darkness — ideal for unlit parking areas. This is the correct answer.",
      "c": "Ultrasonic is effective for open spaces but may be disrupted by HVAC at loading docks. This mapping does not match the specific requirements as well as option B.",
      "d": "Camera systems with AI detection require lighting for optical cameras — they do not inherently work in complete darkness without IR illumination."
    }
  },
  {
    "id": 62,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Physical security",
    "difficulty": "hard",
    "text": "A building security assessment finds that the facility uses access badges but has no visitor management system, no security guards, adequate lighting, and CCTV cameras that are only reviewed after incidents. An attacker performs social engineering by posing as an HVAC technician. Which COMBINATION of physical security controls would MOST effectively have prevented this?",
    "answers": [
      { "id": "a", "text": "Better lighting — the attacker would have been more visible" },
      { "id": "b", "text": "A formal visitor management system requiring identity verification and escort, security guard presence to challenge unescorted individuals in secure areas, real-time CCTV monitoring with alert capabilities, and security awareness training for employees on social engineering tactics" },
      { "id": "c", "text": "More CCTV cameras — covering all angles prevents social engineering" },
      { "id": "d", "text": "Stronger access badge encryption — preventing badge cloning" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Lighting helps visibility but does not stop social engineering — an attacker posing as a technician would simply appear more visible, not be challenged.",
      "b": "Social engineering bypasses technical controls by exploiting human trust. Layered controls address this: visitor management creates checkpoints, security guards challenge unauthorized personnel, real-time monitoring enables response, and employee training creates a human detection layer. This is the correct answer.",
      "c": "More cameras capture better evidence but do not prevent access — an attacker who has already entered is not stopped by more cameras.",
      "d": "Badge cloning was not the attack vector — the attacker used social engineering to gain access without needing to clone a badge."
    }
  },
  {
    "id": 63,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Deception and disruption technology",
    "difficulty": "easy",
    "text": "A security team deploys a server on their network that appears to be a legitimate database server but contains no real data. It is configured to alert security analysts whenever any connection attempts are made to it. This is BEST described as:",
    "answers": [
      { "id": "a", "text": "A honeyfile — a decoy file designed to attract attackers" },
      { "id": "b", "text": "A honeypot — a decoy system designed to lure attackers and detect unauthorized access attempts" },
      { "id": "c", "text": "A honeynet — a network of decoy systems" },
      { "id": "d", "text": "A honeytoken — a decoy credential or data element" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A honeyfile is a specific decoy file — not an entire decoy server system.",
      "b": "A honeypot is a single decoy system designed to attract and detect attacker activity — legitimate users have no reason to access it, so any connection is a strong indicator of unauthorized activity. This is the correct answer.",
      "c": "A honeynet is multiple interconnected honeypots simulating a complete network — a single decoy server is a honeypot.",
      "d": "A honeytoken is a specific data element (credential, API key) — not a decoy server system."
    }
  },
  {
    "id": 64,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Deception and disruption technology",
    "difficulty": "medium",
    "text": "A security team embeds fake AWS API credentials in a publicly accessible GitHub repository as part of their threat detection strategy. When these credentials are used, an alert fires. This technique is BEST described as using a:",
    "answers": [
      { "id": "a", "text": "Honeypot — a decoy system in the cloud" },
      { "id": "b", "text": "Honeytoken — a fake credential or data element designed to detect unauthorized use. When an attacker finds and attempts to use the credentials, the resulting API call triggers an alert indicating a credential exposure incident" },
      { "id": "c", "text": "Honeynet — a network of fake cloud resources" },
      { "id": "d", "text": "Honeyfile — a decoy document containing the credentials" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A honeypot is a decoy system — fake credentials placed as bait are honeytokens.",
      "b": "Honeytokens are specific data elements (API keys, credentials, tokens) designed to detect unauthorized use. Using fake AWS credentials as bait in public repositories is a classic honeytoken deployment. This is the correct answer.",
      "c": "A honeynet involves multiple interconnected systems — fake credentials are honeytokens.",
      "d": "A honeyfile contains decoy data — the credentials themselves are the token. If the credentials were inside a file being tracked, the file would be the honeyfile and the credentials would be a honeytoken within it."
    }
  },
  {
    "id": 65,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Deception and disruption technology",
    "difficulty": "hard",
    "text": "A security operations team deploys a honeynet comprising fake web servers, database servers, and workstations interconnected with realistic traffic. An attacker compromises a real system and begins lateral movement. They discover and enter the honeynet. What intelligence does the honeynet provide that a single honeypot cannot?",
    "answers": [
      { "id": "a", "text": "A honeynet provides faster detection than a honeypot" },
      { "id": "b", "text": "A honeynet enables observation of complete attack chains — the attacker's lateral movement techniques, privilege escalation methods, persistence mechanisms, tools used, communication patterns, and objectives become visible as they move through the fake network environment. This provides threat intelligence about the attacker's full TTPs (Tactics, Techniques, and Procedures) rather than a single point of contact" },
      { "id": "c", "text": "A honeynet is more cost-effective than a honeypot" },
      { "id": "d", "text": "A honeynet blocks attackers while a honeypot only detects them" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Detection speed is similar — the value of a honeynet is breadth of intelligence, not detection speed.",
      "b": "Honeynets enable full attack chain observation — as attackers traverse multiple decoy systems, defenders observe their complete methodology, tools, and objectives. This threat intelligence is invaluable for improving defenses against the specific threat actor. This is the correct answer.",
      "c": "Honeynets are typically more expensive than single honeypots — requiring more systems and management.",
      "d": "Neither honeypots nor honeynets block attackers — both are detection and intelligence-gathering tools. Disruption is a secondary benefit if attackers spend time in decoy environments."
    }
  },
  {
    "id": 66,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Deception and disruption technology",
    "difficulty": "hard",
    "text": "A security team embeds canary tokens in highly sensitive documents — when the document is opened from an unauthorized system, the token makes an HTTP callback revealing the opener's IP address. The documents are placed in locations where only an insider threat or attacker with significant access would find them. Which deception technology term BEST describes these canary-embedded documents?",
    "answers": [
      { "id": "a", "text": "Honeypot — the documents are decoy systems" },
      { "id": "b", "text": "Honeyfiles — the documents themselves are the decoy artifacts. The embedded canary tokens are honeytokens within the honeyfiles. When accessed by unauthorized parties, they reveal the access attempt through the callback mechanism" },
      { "id": "c", "text": "Honeynet — the documents form a network of decoys" },
      { "id": "d", "text": "Honeytoken — the entire document is the token" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Honeypots are decoy systems — documents are honeyfiles.",
      "b": "The documents are honeyfiles (decoy file artifacts designed to attract unauthorized access). The embedded canary tokens are honeytokens within those files. Both terms apply at different granularities. This is the correct answer.",
      "c": "A honeynet is multiple interconnected systems — decoy documents are honeyfiles.",
      "d": "The document as a whole is the honeyfile — the embedded callback mechanism (canary token) is the honeytoken. Calling the entire document a honeytoken conflates the two levels of deception."
    }
  },
  {
    "id": 67,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Deception and disruption technology",
    "difficulty": "hard",
    "text": "A security team deploys deception technology across their environment — honeypots, honeyfiles, and honeytokens. Six months later, no alerts have fired. A junior analyst declares the investment wasted since 'nothing was detected.' A senior analyst disagrees. Which interpretation is MORE accurate?",
    "answers": [
      { "id": "a", "text": "The junior analyst is correct — no alerts means the technology provided no value" },
      { "id": "b", "text": "The senior analyst is correct for multiple reasons: (1) no detection may mean the deception assets are well-placed and no threat actors with access have been present — a negative result; (2) deception technology has inherently low false positive rates — any firing would be high-confidence; (3) the presence of deception may have disrupted attacker operations as they tried to avoid detection. Six months without alerts with well-designed deception means the environment may be free of active threat actors who have reached those assets" },
      { "id": "c", "text": "The technology should be replaced with a SIEM which generates more alerts" },
      { "id": "d", "text": "Deception technology should fire alerts daily to prove its value" }
    ],
    "correct": "b",
    "explanations": {
      "a": "No alerts from deception technology is not inherently negative — it may mean no unauthorized access to those assets occurred, which is a security positive.",
      "b": "Deception technology's value includes the negative case — the absence of alerts means either no threat actors with relevant access are present, or they are actively avoiding deception assets (itself useful intelligence). High-confidence alerts when they do fire are the primary operational value. This is the correct answer.",
      "c": "SIEMs generate many alerts (including false positives) for different purposes — deception technology complements SIEMs by providing high-fidelity, low-volume alerts.",
      "d": "Deception technology should only fire when unauthorized access occurs — artificial alerts undermine the high-confidence signal value."
    }
  },
  {
    "id": 68,
    "domain": "1.0",
    "objective": "1.2",
    "keyword": "Gap analysis",
    "difficulty": "hard",
    "text": "A gap analysis for a healthcare organization comparing their controls against HIPAA Security Rule requirements reveals gaps in: (1) encryption of ePHI at rest, (2) workforce security training, and (3) audit controls for ePHI access. The organization has limited budget. How should they prioritize remediation of these gaps?",
    "answers": [
      { "id": "a", "text": "Remediate in alphabetical order — audit controls, encryption, workforce training" },
      { "id": "b", "text": "Prioritize based on risk impact and likelihood: ePHI encryption at rest addresses the highest likelihood of data breach (physical theft/improper disposal), audit controls address regulatory enforcement priority (regulators require evidence of access monitoring), and workforce training addresses the most frequent breach cause (human error/phishing). A risk-based prioritization framework should be applied given budget constraints, likely placing encryption and audit controls first due to direct regulatory and breach risk" },
      { "id": "c", "text": "Implement the cheapest control first to show progress" },
      { "id": "d", "text": "Address all gaps simultaneously regardless of budget constraints" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Alphabetical prioritization ignores risk — gap analysis should drive risk-based prioritization.",
      "b": "Risk-based prioritization considers likelihood of exploitation and magnitude of impact — ePHI encryption addresses direct breach risk, audit controls meet regulatory enforcement expectations, and training addresses the human factor. This framework is correct. This is the correct answer.",
      "c": "Cost-based prioritization may implement low-risk controls while high-risk gaps remain open — risk should drive prioritization.",
      "d": "Attempting all gaps simultaneously with limited budget typically results in none being fully implemented — prioritization enables effective resource allocation."
    }
  },
  {
    "id": 69,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Approval process",
    "difficulty": "easy",
    "text": "Why is a formal approval process essential to a secure change management program?",
    "answers": [
      { "id": "a", "text": "It slows down changes so attackers cannot exploit them during deployment" },
      { "id": "b", "text": "It ensures that proposed changes are reviewed for security, business, and technical impact by appropriate stakeholders before implementation — preventing unauthorized or poorly planned changes that could introduce vulnerabilities or cause outages" },
      { "id": "c", "text": "It gives the IT team legal authority to make changes to production systems" },
      { "id": "d", "text": "It documents changes after they occur for audit purposes" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The purpose of approval is oversight and risk review — not deliberately slowing change to thwart attackers.",
      "b": "A formal approval process ensures that changes are reviewed before implementation — catching security risks, compatibility issues, and business impacts that implementers may overlook. Unauthorized changes are a major source of security incidents. This is the correct answer.",
      "c": "Legal authority to make changes is established by role and policy — the approval process ensures those authorized changes are vetted before execution.",
      "d": "Approval occurs before implementation — post-change documentation is a separate step."
    }
  },
  {
    "id": 70,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Approval process",
    "difficulty": "medium",
    "text": "A developer pushes an emergency hotfix directly to production without going through the change management approval process. The fix inadvertently disables a security control. Which change management element would MOST directly have prevented this outcome?",
    "answers": [
      { "id": "a", "text": "A better backout plan for the hotfix" },
      { "id": "b", "text": "Requiring all changes — including emergency changes — to go through at least an expedited approval process with security review, preventing unreviewed modifications to production that could disable security controls" },
      { "id": "c", "text": "A longer maintenance window allowing more testing time" },
      { "id": "d", "text": "Better version control of the production codebase" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A backout plan helps recover after a bad change — it does not prevent the security control from being disabled in the first place.",
      "b": "Bypassing the approval process allowed an unreviewed change to reach production. Even emergency changes should have an expedited review — a security reviewer would likely catch that a security control was being disabled. This is the correct answer.",
      "c": "The maintenance window is about timing — not about reviewing the content of the change for security impact.",
      "d": "Version control tracks what changed — the approval process is what would have caught the security impact before the change was made."
    }
  },
  {
    "id": 71,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Ownership",
    "difficulty": "easy",
    "text": "In change management, what is the role of the change owner?",
    "answers": [
      { "id": "a", "text": "The change owner is responsible for approving all changes submitted by others" },
      { "id": "b", "text": "The change owner is the individual or team accountable for the change — responsible for ensuring it is properly planned, tested, approved, implemented, and documented, and answerable if the change causes problems" },
      { "id": "c", "text": "The change owner owns the hardware or software being changed" },
      { "id": "d", "text": "The change owner is the senior executive who signs off on all IT changes" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The Change Advisory Board (CAB) typically approves changes — the change owner is accountable for the specific change, not all changes.",
      "b": "The change owner has end-to-end accountability for their change — from planning and testing through implementation and documentation. They are the point of accountability if the change has problems. This is the correct answer.",
      "c": "Asset ownership and change ownership are different concepts — the change owner is accountable for the change process, not necessarily the asset.",
      "d": "Senior executives may approve certain high-impact changes — but the change owner is typically the person or team directly accountable for the change."
    }
  },
  {
    "id": 72,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Impact analysis",
    "difficulty": "easy",
    "text": "Before deploying a new firewall rule, a security team evaluates which applications and services might be affected and identifies three critical business applications that could be disrupted. This activity is BEST described as:",
    "answers": [
      { "id": "a", "text": "A vulnerability assessment — identifying weaknesses in the firewall" },
      { "id": "b", "text": "An impact analysis — evaluating the potential effects of the proposed change on systems, services, and business operations before the change is made" },
      { "id": "c", "text": "A gap analysis — comparing current and desired security states" },
      { "id": "d", "text": "A threat model — identifying potential attackers who might exploit the new rule" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A vulnerability assessment identifies security weaknesses — not the business and operational impact of a change.",
      "b": "Impact analysis evaluates what a proposed change might affect before implementation — identifying that three critical applications could be disrupted allows the team to plan accordingly. This is the correct answer.",
      "c": "Gap analysis compares current to desired state — impact analysis evaluates the effect of a specific proposed change.",
      "d": "Threat modeling identifies threats and attack vectors — impact analysis focuses on operational and business effects of changes."
    }
  },
  {
    "id": 73,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Impact analysis",
    "difficulty": "medium",
    "text": "A change management team performs an impact analysis for a proposed operating system upgrade across 500 workstations. The analysis should address which of the following security-relevant questions?",
    "answers": [
      { "id": "a", "text": "Only whether the upgrade will complete within the maintenance window" },
      { "id": "b", "text": "Whether existing security agents (AV, EDR) are compatible with the new OS version; whether security patches are included; whether the upgrade requires disabling security controls during installation; and whether data migration might expose sensitive information during the process" },
      { "id": "c", "text": "Only the cost of the upgrade licenses" },
      { "id": "d", "text": "Whether employees prefer the new OS interface" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Maintenance window timing is one consideration — but security impact analysis must address compatibility, exposure, and security control continuity.",
      "b": "Security-focused impact analysis for an OS upgrade must address: agent compatibility (will AV/EDR break?), patch content (are vulnerabilities addressed?), installation requirements (must security features be temporarily disabled?), and data handling during migration. This is the correct answer.",
      "c": "Cost is a business consideration — not a security impact analysis question.",
      "d": "User preference is a user adoption concern — not a security impact question."
    }
  },
  {
    "id": 74,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Backout plan",
    "difficulty": "easy",
    "text": "What is the purpose of a backout plan in change management?",
    "answers": [
      { "id": "a", "text": "A backout plan documents all the changes made during a maintenance window" },
      { "id": "b", "text": "A backout plan provides documented procedures to reverse a change and restore the system to its pre-change state if the change causes problems or fails" },
      { "id": "c", "text": "A backout plan identifies the stakeholders who need to approve a change" },
      { "id": "d", "text": "A backout plan lists backup copies of data that will be created during the change" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Documenting changes made is part of change records — not the backout plan's primary purpose.",
      "b": "A backout plan defines the steps to reverse a change if it fails — including who initiates it, what steps to follow, and how to verify the rollback succeeded. Without a backout plan, a failed change may cause extended outages. This is the correct answer.",
      "c": "Stakeholder identification is part of change planning — not the backout plan.",
      "d": "Backup creation may be part of the backout plan's preparation — but the plan itself describes how to reverse the change."
    }
  },
  {
    "id": 75,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Backout plan",
    "difficulty": "medium",
    "text": "A team deploys a database schema change during a maintenance window. Two hours into the deployment, critical errors occur. The team initiates the backout plan. The backout fails because the rollback script was written for the previous version, not accounting for a dependency that was also upgraded. What change management lesson does this illustrate?",
    "answers": [
      { "id": "a", "text": "Backout plans should never be created — changes should always be permanent" },
      { "id": "b", "text": "Backout plans must be tested as rigorously as the change itself — and must account for all dependencies and parallel changes. An untested backout plan that fails during a real incident extends the outage and increases impact" },
      { "id": "c", "text": "The error proves the change was unnecessary and should not have been made" },
      { "id": "d", "text": "Backout plans should only be created for critical changes, not routine database updates" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Backout plans are essential risk management tools — permanent changes with no rollback capability greatly increase deployment risk.",
      "b": "An untested backout plan is as dangerous as no backout plan. Testing the rollback procedure — including accounting for all dependencies — ensures it will actually work when needed. This is the correct answer.",
      "c": "The error in the backout plan is a process failure — not evidence the change was unnecessary.",
      "d": "All significant changes should have tested backout plans — including database updates that can have significant dependencies."
    }
  },
  {
    "id": 76,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Maintenance window",
    "difficulty": "easy",
    "text": "Why are maintenance windows an important component of secure change management?",
    "answers": [
      { "id": "a", "text": "Maintenance windows allow IT teams to avoid approval requirements for after-hours changes" },
      { "id": "b", "text": "Maintenance windows define pre-approved time periods when changes can be made to systems — reducing the business impact of potential disruptions and ensuring changes occur when support resources are available and impact on users is minimized" },
      { "id": "c", "text": "Maintenance windows are required by law for all system changes" },
      { "id": "d", "text": "Maintenance windows prevent attackers from accessing systems during changes" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Maintenance windows do not bypass approval requirements — they define when approved changes are implemented.",
      "b": "Maintenance windows reduce change risk by ensuring changes occur during low-usage periods when outages have minimal business impact, support resources are available, and changes can be properly monitored. This is the correct answer.",
      "c": "Maintenance windows are best-practice change management — not universally legally required (though some regulated industries may require them).",
      "d": "Maintenance windows don't prevent attacker access — they reduce business disruption risk from authorized changes."
    }
  },
  {
    "id": 77,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Maintenance window",
    "difficulty": "hard",
    "text": "A critical security vulnerability (CVSS 9.8) is publicly disclosed with active exploitation in the wild. The next scheduled maintenance window is 12 days away. How should change management handle this situation?",
    "answers": [
      { "id": "a", "text": "Wait for the scheduled maintenance window to ensure proper change control is followed" },
      { "id": "b", "text": "Invoke the emergency change process — applying an expedited but still-reviewed change outside the normal maintenance window. The vulnerability's active exploitation creates unacceptable risk that outweighs the process disruption. Apply compensating controls immediately (network-level blocking, WAF rules) while the emergency patch is tested and deployed" },
      { "id": "c", "text": "Patch immediately without any change management review to minimize exposure" },
      { "id": "d", "text": "Accept the risk and document it — active exploitation does not guarantee the organization will be targeted" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Waiting 12 days with a CVSS 9.8 vulnerability under active exploitation is not acceptable — the risk of waiting outweighs the process disruption of an emergency change.",
      "b": "Emergency change processes exist for exactly this situation — expedited review (not no review) with immediate compensating controls while the patch is properly tested and deployed. This is the correct answer.",
      "c": "Patching without any review risks introducing additional problems — emergency change processes provide expedited review without the full overhead of normal change management.",
      "d": "Active exploitation of a CVSS 9.8 vulnerability represents critical risk — documented risk acceptance is appropriate for low-severity issues, not critical actively-exploited vulnerabilities."
    }
  },
  {
    "id": 78,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Standard operating procedure",
    "difficulty": "easy",
    "text": "How do Standard Operating Procedures (SOPs) contribute to security in change management?",
    "answers": [
      { "id": "a", "text": "SOPs ensure all changes are automatically approved without manual review" },
      { "id": "b", "text": "SOPs provide documented, repeatable step-by-step procedures for performing changes consistently and securely — reducing the likelihood of errors, omissions, and security misconfigurations that occur when staff improvise change procedures" },
      { "id": "c", "text": "SOPs replace the need for testing since documented procedures are assumed to be correct" },
      { "id": "d", "text": "SOPs are only required for compliance purposes and have no practical security benefit" }
    ],
    "correct": "b",
    "explanations": {
      "a": "SOPs define how to perform changes — not whether to approve them.",
      "b": "SOPs ensure changes are performed consistently according to tested, secure procedures — preventing the security risks introduced by ad-hoc or improvised approaches. This is the correct answer.",
      "c": "SOPs should be validated through testing — documentation of a procedure does not guarantee correctness without verification.",
      "d": "SOPs have concrete security benefits: they prevent configuration errors, ensure security steps are not skipped, and enable consistent auditing of whether procedures are followed."
    }
  },
  {
    "id": 79,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Allow lists/deny lists",
    "difficulty": "easy",
    "text": "A security team is configuring a web application firewall to control which file types can be uploaded. They configure the WAF to only permit .pdf and .docx uploads and block all other types. This approach uses which security concept?",
    "answers": [
      { "id": "a", "text": "A deny list — specifying what is not allowed while permitting everything else" },
      { "id": "b", "text": "An allow list — specifying only what is explicitly permitted and blocking everything not on the list" },
      { "id": "c", "text": "A blacklist — an outdated term for the same concept as a deny list" },
      { "id": "d", "text": "A sandbox — isolating file uploads for analysis" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A deny list blocks specific known-bad items while allowing everything else — permitting only .pdf and .docx blocks everything not explicitly listed, which is an allow list.",
      "b": "An allow list (whitelist) permits only explicitly approved items — all other items are blocked by default. Permitting only .pdf and .docx while blocking all other file types is an allow list approach. This is the correct answer.",
      "c": "Blacklist is an older term for deny list — the configuration described is an allow list, not a deny list.",
      "d": "Sandboxing isolates files for analysis — not the same as restricting which file types are permitted."
    }
  },
  {
    "id": 80,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Allow lists/deny lists",
    "difficulty": "medium",
    "text": "A security team debates whether to implement an application allow list or a deny list for endpoint software control. Which approach provides STRONGER security and why?",
    "answers": [
      { "id": "a", "text": "Deny lists are stronger — they catch all known malware" },
      { "id": "b", "text": "Allow lists are stronger — they only permit explicitly approved applications. Any application not on the list is blocked, including unknown malware that would not yet appear on a deny list. Deny lists are inherently reactive and can never be complete as new malware is constantly created" },
      { "id": "c", "text": "Both approaches are equally effective — the choice is purely administrative" },
      { "id": "d", "text": "Deny lists are stronger because they require no maintenance after initial setup" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Deny lists can only block known malware — zero-day and novel malware bypasses deny lists until signatures are added.",
      "b": "Allow lists provide default-deny security — only pre-approved applications can run. Unknown, novel, or zero-day malware is blocked because it is not on the allow list. This is the correct answer.",
      "c": "They are not equally effective — allow lists provide significantly stronger security at the cost of higher administrative overhead.",
      "d": "Deny lists require constant updates as new malware emerges — they have higher maintenance requirements than allow lists, not lower."
    }
  },
  {
    "id": 81,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Restricted activities",
    "difficulty": "medium",
    "text": "A change management policy defines 'restricted activities' during change implementation. Which of the following BEST describes why certain activities are restricted during active change windows?",
    "answers": [
      { "id": "a", "text": "Restricted activities prevent employees from working during maintenance windows" },
      { "id": "b", "text": "Restricting activities during change windows prevents concurrent changes from creating complex, difficult-to-diagnose interactions — ensuring that if a problem occurs, the root cause can be isolated to the specific change being implemented rather than an interaction between multiple simultaneous changes" },
      { "id": "c", "text": "Restricted activities are required by law during all system modifications" },
      { "id": "d", "text": "Restrictions during change windows prevent security teams from monitoring systems" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Restricted activities apply to concurrent changes — not employee work in general.",
      "b": "Change management principles call for controlled change environments — allowing multiple concurrent changes makes problem isolation nearly impossible. Restricting concurrent activities ensures clear cause-and-effect visibility. This is the correct answer.",
      "c": "Activity restrictions during change windows are best practice — not universally legally mandated.",
      "d": "Security monitoring should continue during change windows — restricted activities apply to additional unplanned changes, not monitoring."
    }
  },
  {
    "id": 82,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Downtime",
    "difficulty": "medium",
    "text": "A change requires taking a critical authentication server offline for 30 minutes. During this downtime, users cannot log into any enterprise applications. What change management considerations should address this downtime risk?",
    "answers": [
      { "id": "a", "text": "Downtime risk should be accepted without additional planning since changes always require some downtime" },
      { "id": "b", "text": "The change plan should address: scheduling during the lowest-usage window, communicating planned downtime to affected users in advance, deploying a high-availability configuration or failover authentication method for the duration, defining the exact downtime window with escalation triggers if it is exceeded, and having a tested backout plan if the change cannot be completed within the planned window" },
      { "id": "c", "text": "Only notify users after the downtime has occurred" },
      { "id": "d", "text": "Downtime of a non-production server requires no special change management consideration" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Accepting downtime risk without planning is a change management failure — downtime should be planned, minimized, and communicated.",
      "b": "Downtime planning requires scheduling optimization, advance communication, temporary alternatives where possible, defined time boundaries with escalation triggers, and backout planning. This is the correct answer.",
      "c": "Post-downtime notification is insufficient — users need advance notice to plan for the outage.",
      "d": "An authentication server is critical infrastructure — even if labeled non-production in some systems, its downtime impacts all enterprise application logins."
    }
  },
  {
    "id": 83,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Service restart",
    "difficulty": "medium",
    "text": "A security update for a web application server requires a service restart. The application team notes that the restart will temporarily close all active user sessions. From a change management perspective, what security consideration is MOST important regarding service restarts?",
    "answers": [
      { "id": "a", "text": "Service restarts are always risk-free and require no special consideration" },
      { "id": "b", "text": "Service restarts should be planned during low-usage periods, users should be notified in advance, session state should be managed to minimize data loss, and security teams should verify that services restart with the correct security configuration rather than defaulting to less secure settings" },
      { "id": "c", "text": "Service restarts only need consideration if they take more than one hour" },
      { "id": "d", "text": "Service restarts are purely operational concerns with no security implications" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Service restarts carry risks — session disruption, configuration changes, and potential for services to start in non-secure states.",
      "b": "Security-relevant considerations for service restarts include: timing (user impact), session management (data loss), and verification that the service restarts with correct security configuration — some services revert to default settings on restart. This is the correct answer.",
      "c": "Duration is not the primary concern — all service restarts have security implications regardless of duration.",
      "d": "Service restarts have security implications — configuration verification after restart is a security-critical step."
    }
  },
  {
    "id": 84,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Legacy applications",
    "difficulty": "medium",
    "text": "A change management team proposes updating a firewall ruleset. During review, they discover that a legacy application — still in production — relies on an insecure protocol (Telnet) that would be blocked by the new ruleset. How should change management address this finding?",
    "answers": [
      { "id": "a", "text": "Block Telnet immediately — legacy applications cannot override security policies" },
      { "id": "b", "text": "Document the legacy application dependency, assess the risk of blocking vs. permitting Telnet, implement the most restrictive feasible rule (limiting Telnet to specific source/destination IPs rather than broadly), implement compensating controls, and develop a migration plan to replace the legacy application with one supporting secure protocols" },
      { "id": "c", "text": "Exclude all legacy application traffic from firewall rules permanently" },
      { "id": "d", "text": "The change should be abandoned since legacy applications cannot be accommodated alongside security improvements" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Immediately blocking may break a production application — impact assessment and risk management must precede action.",
      "b": "Legacy application dependencies require a balanced approach: minimize risk through tighter rules, implement compensating controls, and plan elimination of the root cause (the legacy application). This is the correct answer.",
      "c": "Permanently excluding legacy application traffic from all security controls creates an ongoing security gap — targeted rules and compensating controls are more appropriate.",
      "d": "Legacy dependencies are a common reality — change management must navigate them through risk management, not abandon security improvements."
    }
  },
  {
    "id": 85,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Dependencies",
    "difficulty": "hard",
    "text": "A change to update a shared authentication library affects 23 downstream applications. During post-change testing, 4 applications fail. The change team did not map all dependencies before implementation. What change management process failure does this represent and how could it have been avoided?",
    "answers": [
      { "id": "a", "text": "The applications failed due to bugs in the library update — dependency mapping is not related" },
      { "id": "b", "text": "Incomplete dependency mapping before the change — a thorough dependency analysis would have identified all 23 affected applications, enabling pre-change testing with each, defining pass/fail criteria, and planning rollback triggers. The 4 failures could have been caught in the test environment rather than production" },
      { "id": "c", "text": "Application failures during changes are inevitable and acceptable" },
      { "id": "d", "text": "The solution is to make changes to shared libraries less frequently" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Dependency mapping directly reveals which applications consume the library — incomplete mapping leads exactly to unexpected failures in applications the change team did not test.",
      "b": "Dependency mapping must precede changes to shared components — without knowing all consumers, testing is incomplete and production failures are predictable. This is the correct answer.",
      "c": "Application failures from changes are a process failure — not an accepted operational reality.",
      "d": "Frequency is not the root cause — even rare changes to shared libraries require complete dependency mapping."
    }
  },
  {
    "id": 86,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Dependencies",
    "difficulty": "hard",
    "text": "A security team is asked to review a change that will upgrade a cryptographic library used by 15 services. What dependency-related security considerations must be included in the change review?",
    "answers": [
      { "id": "a", "text": "Only check if the upgrade is compatible with the primary service — dependencies are an operational concern, not a security one" },
      { "id": "b", "text": "Verify that the new library version: supports the same or stronger cryptographic algorithms used by all 15 services; does not deprecate algorithms that any service still requires; maintains backward compatibility for certificate formats; does not change key sizes in ways that break existing encrypted data; and does not alter API signatures that security functions in downstream services call" },
      { "id": "c", "text": "Cryptographic library updates never have security implications for dependent services" },
      { "id": "d", "text": "Review only the library's CVE history — functional dependency considerations are outside the security team's scope" }
    ],
    "correct": "b",
    "explanations": {
      "a": "All 15 services must be reviewed — a single missed dependency can leave a service unable to encrypt/decrypt data after the update.",
      "b": "Cryptographic library updates have complex security dependency considerations: algorithm support changes, API compatibility, and data format compatibility all have security implications for dependent services. This is the correct answer.",
      "c": "Cryptographic library updates frequently have significant security implications — deprecated algorithms, changed default settings, and API changes all affect dependent services.",
      "d": "CVE history is one aspect — functional dependency compatibility is also a security concern when cryptographic functionality changes."
    }
  },
  {
    "id": 87,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Updating diagrams",
    "difficulty": "easy",
    "text": "After completing a network infrastructure change that added a new DMZ segment, the change management closure process requires updating network diagrams. Why is updating documentation a security-relevant step?",
    "answers": [
      { "id": "a", "text": "Updated diagrams are required only for compliance audits and have no operational security value" },
      { "id": "b", "text": "Accurate, current network diagrams are essential for security operations — they enable correct firewall rule implementation, accurate scope definition for security assessments, effective incident response, and correct security architecture reviews. Outdated diagrams lead to security gaps in new segments that are not included in security monitoring" },
      { "id": "c", "text": "Diagrams should only be updated annually during security reviews" },
      { "id": "d", "text": "Network diagrams are not security documents and updating them is purely an administrative task" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Current diagrams have direct operational security value — they guide incident response, security assessments, and ongoing security operations.",
      "b": "Accurate documentation is a security control — a new DMZ segment not reflected in diagrams may be excluded from security monitoring scope, vulnerability assessments, and firewall policy reviews. This is the correct answer.",
      "c": "Diagrams must be updated when changes occur — annual review may leave security teams working with outdated information for months.",
      "d": "Network diagrams are fundamental security documents — they guide firewall design, incident response, and security assessments."
    }
  },
  {
    "id": 88,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Updating diagrams",
    "difficulty": "hard",
    "text": "A security assessment team is preparing a penetration test scope. They reference network diagrams that were not updated after a cloud migration 8 months ago. The diagrams show on-premises systems that no longer exist and omit new cloud resources. What security risks does this documentation gap create?",
    "answers": [
      { "id": "a", "text": "The outdated diagrams have no security impact since the actual systems still function correctly" },
      { "id": "b", "text": "The penetration test will miss the new cloud resources (untested attack surface), may include systems that no longer exist (wasted effort), and security teams relying on these diagrams for incident response, firewall management, and security architecture decisions will be working with incorrect network topology — potentially leaving cloud resources without appropriate security controls" },
      { "id": "c", "text": "The documentation gap only matters if a breach occurs targeting the undocumented systems" },
      { "id": "d", "text": "Penetration testers should independently discover all systems without relying on diagrams" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Outdated documentation creates real security gaps — undocumented cloud resources may lack proper security coverage.",
      "b": "Documentation gaps create multiple security risks: untested attack surfaces, misaligned firewall policies, incomplete incident response scope, and inaccurate security assessments. This is the correct answer.",
      "c": "Documentation gaps create security risk before any breach — proactive security coverage depends on accurate documentation.",
      "d": "While penetration testers should use asset discovery, the scope and authorization depend on accurate documentation — testing unknown systems may be unauthorized."
    }
  },
  {
    "id": 89,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Updating policies/procedures",
    "difficulty": "medium",
    "text": "An organization implements multi-factor authentication across all systems. Their existing access control policy only references username and password requirements. What change management documentation step is required?",
    "answers": [
      { "id": "a", "text": "No policy update is needed — technical implementations supersede written policies" },
      { "id": "b", "text": "The access control policy must be updated to reflect MFA requirements — policies and technical implementations must align. Outdated policies that contradict implemented controls create confusion, compliance issues, and may be cited in audits as evidence of governance failures" },
      { "id": "c", "text": "Create a separate MFA-specific policy without modifying the existing access control policy" },
      { "id": "d", "text": "Policy updates should wait until the annual policy review cycle" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Technical implementations and policies must be aligned — a policy contradicting actual technical controls creates a governance gap.",
      "b": "Policy documentation must reflect actual security requirements and implemented controls — updated MFA requirements must be reflected in the access control policy to ensure consistent enforcement, clear employee expectations, and accurate compliance evidence. This is the correct answer.",
      "c": "A separate policy creates fragmentation — updating the existing access control policy maintains a cohesive governance document.",
      "d": "Policy updates should occur when significant security changes are implemented — waiting until annual review leaves a period where policies contradict reality."
    }
  },
  {
    "id": 90,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Version control",
    "difficulty": "easy",
    "text": "A security team maintains all firewall configurations and IaC templates in a Git repository with commit history. Why is version control important for security configurations?",
    "answers": [
      { "id": "a", "text": "Version control automatically applies security configurations to production systems" },
      { "id": "b", "text": "Version control maintains a complete history of all changes to security configurations — enabling rollback to known-good states when changes cause problems, identification of who changed what and when for audit purposes, and detection of unauthorized configuration changes" },
      { "id": "c", "text": "Version control is only beneficial for application code — not security configurations" },
      { "id": "d", "text": "Version control prevents attackers from accessing configuration files" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Version control stores and tracks configurations — deployment to production requires additional pipeline tooling.",
      "b": "Version control for security configurations enables: rollback to known-good states, attribution of changes (who changed what and when), detection of unauthorized modifications, and audit trails of configuration history. This is the correct answer.",
      "c": "Version control is equally — if not more — important for security configurations as for application code, since configuration errors can directly create security vulnerabilities.",
      "d": "Version control repositories should themselves be access-controlled — version control tracks changes but does not prevent access to the configurations."
    }
  },
  {
    "id": 91,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Version control",
    "difficulty": "medium",
    "text": "A security engineer accidentally introduces a misconfiguration in a firewall ruleset that opens an unintended port. Version control shows the change was made by the engineer's account 3 days ago. What security benefits does version control provide in this scenario?",
    "answers": [
      { "id": "a", "text": "Version control cannot help since the port has already been open for 3 days" },
      { "id": "b", "text": "Version control enables: (1) precise identification of the exact change that introduced the misconfiguration; (2) attribution to the specific account that made the change; (3) rapid rollback to the last known-good configuration; and (4) audit trail for incident investigation. The 3-day exposure window can be assessed for potential exploitation using this timeline" },
      { "id": "c", "text": "Version control only identifies the problem — it cannot help with remediation" },
      { "id": "d", "text": "Version control is not a security tool — it is only useful for software developers" }
    ],
    "correct": "b",
    "explanations": {
      "a": "While the port was open for 3 days, version control immediately enables rollback and precise incident timeline analysis — both valuable.",
      "b": "Version control provides identification (what changed), attribution (who changed it), remediation (rollback), and investigation (3-day exposure timeline). This is the correct answer.",
      "c": "Version control explicitly enables remediation through rollback — reverting to the pre-misconfiguration state restores the correct firewall configuration.",
      "d": "Version control is widely used for infrastructure and security configurations — not limited to application development."
    }
  },
  {
    "id": 92,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Version control",
    "difficulty": "hard",
    "text": "A security team discovers that a critical security policy document was modified without any change record 6 weeks ago. The organization uses version control for configurations but not for policy documents. How should the organization respond and what process improvement addresses the root cause?",
    "answers": [
      { "id": "a", "text": "The modification was likely made by a legitimate administrator — no action is required" },
      { "id": "b", "text": "Investigate the unauthorized modification: compare current document to the last known-good version, review who had access and when the modification was made using available logs. Root cause: extend version control (or a document management system with version history and access logging) to all security documents — not just technical configurations. Policy documents are as security-critical as configurations" },
      { "id": "c", "text": "Delete the current document and restore a backup — no further investigation needed" },
      { "id": "d", "text": "Version control for policy documents is unnecessary overhead — only technical configurations require version tracking" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Unauthorized modifications to security policy documents are potential indicators of insider threat or compliance manipulation — investigation is required.",
      "b": "The response requires investigation of the unauthorized change and root cause analysis. The process improvement is extending version control to policy documents — giving the same historical tracking and access attribution to documents as to technical configurations. This is the correct answer.",
      "c": "Restoring a backup without investigation destroys forensic evidence and misses the opportunity to understand how the change was made.",
      "d": "Policy documents define security requirements — unauthorized changes are as impactful as configuration changes. Version control should apply to all security-relevant artifacts."
    }
  },
  {
    "id": 93,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Test results",
    "difficulty": "medium",
    "text": "A change to a web application includes new input validation code intended to prevent SQL injection. The change management process requires test results before production deployment. What tests should be included in the security test results?",
    "answers": [
      { "id": "a", "text": "Only functional tests confirming the application still works correctly" },
      { "id": "b", "text": "Security test results should include: SAST (static analysis) scan results confirming no new vulnerabilities were introduced; DAST (dynamic analysis) results with SQL injection test cases confirming the input validation blocks injection attempts; regression tests confirming existing functionality still works; and potentially penetration test results for high-risk changes" },
      { "id": "c", "text": "No security testing is required since the change is a security improvement" },
      { "id": "d", "text": "Only test results from the development environment are required — production testing is not needed" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Functional tests confirm the application works — security tests confirm the security controls work and no new vulnerabilities were introduced.",
      "b": "Security changes require security-specific test results: SAST, DAST, and regression testing together confirm the change achieved its security objective without introducing new problems. This is the correct answer.",
      "c": "Security improvements can introduce new vulnerabilities (e.g., the input validation itself could have logic flaws) — security testing is always required.",
      "d": "Development environment testing may not replicate all production conditions — appropriate staging/pre-production test results are required."
    }
  },
  {
    "id": 94,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Stakeholders",
    "difficulty": "medium",
    "text": "A proposed change will upgrade the encryption on a customer-facing API from TLS 1.2 to TLS 1.3. Who are the relevant stakeholders whose input should be included in the change management review?",
    "answers": [
      { "id": "a", "text": "Only the security team — encryption changes are a security matter" },
      { "id": "b", "text": "Relevant stakeholders include: the security team (encryption policy compliance), application development team (API compatibility), operations team (deployment and monitoring), business relationship owners (customer impact), partner/customer representatives if the API serves external parties (compatibility of their TLS 1.3 support), and the change advisory board" },
      { "id": "c", "text": "Only the IT operations team — they perform the deployment" },
      { "id": "d", "text": "Only senior management — encryption decisions are executive-level decisions" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Encryption changes have implications beyond security — application compatibility, customer impact, and operational deployment all require stakeholder input.",
      "b": "TLS upgrade stakeholders span multiple teams: security (compliance), development (API compatibility), operations (deployment), and external parties (TLS 1.3 support of customers/partners who consume the API). This is the correct answer.",
      "c": "Operations handles deployment — but development, security, and business stakeholders must also be involved.",
      "d": "Senior management may need to approve significant changes — but technical and operational stakeholders must be engaged for the review."
    }
  },
  {
    "id": 95,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Stakeholders",
    "difficulty": "hard",
    "text": "A change management review for a major security platform replacement reveals that the legal and compliance team was not consulted. What risks does excluding legal/compliance stakeholders from security change reviews create?",
    "answers": [
      { "id": "a", "text": "Legal and compliance involvement is optional — security changes are purely technical decisions" },
      { "id": "b", "text": "Excluding legal/compliance stakeholders risks: implementing a security solution that does not meet regulatory logging requirements; missing contractual obligations to maintain specific security certifications; creating data residency issues if the new platform stores data in different locations; and missing industry-specific compliance requirements that the old platform met" },
      { "id": "c", "text": "Legal and compliance teams only need to be involved for compliance reporting — not change reviews" },
      { "id": "d", "text": "The risk is only reputational — legal non-compliance from security changes has no operational impact" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Legal and compliance are essential stakeholders for security platform changes — regulatory and contractual requirements are often embedded in security requirements.",
      "b": "Security platforms have direct compliance implications — logging formats, retention periods, encryption standards, and data residency are often regulatory requirements. Excluding legal/compliance risks deploying a technically sound system that fails compliance requirements. This is the correct answer.",
      "c": "Legal and compliance must be involved in change reviews when changes affect compliance-relevant capabilities — not only during reporting.",
      "d": "Legal non-compliance creates financial, operational, and reputational risks — not just reputational."
    }
  },
  {
    "id": 96,
    "domain": "1.0",
    "objective": "1.3",
    "keyword": "Application restart",
    "difficulty": "hard",
    "text": "A security patch requires restarting a stateful application that holds active user sessions and in-memory encryption keys. The security team identifies that the restart will clear the in-memory keys, requiring re-keying from the HSM. What change management considerations are specifically relevant to this scenario?",
    "answers": [
      { "id": "a", "text": "Application restarts have no unique security considerations beyond general downtime planning" },
      { "id": "b", "text": "Security-specific considerations include: verifying the HSM re-keying process is documented and tested before the maintenance window; ensuring the HSM is available and authenticated during the restart process; planning for the time required for re-keying (extending the maintenance window estimate); verifying that session tokens are properly invalidated on restart (not allowing stale authenticated sessions); and confirming the application starts with correct security configuration rather than defaulting to weaker settings" },
      { "id": "c", "text": "Only schedule the restart during a maintenance window — no additional security considerations are required" },
      { "id": "d", "text": "In-memory key loss is acceptable — keys can be reconstructed from the application logs" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Stateful applications with in-memory cryptographic keys have specific security restart considerations — HSM re-keying, session invalidation, and secure startup are all security-relevant.",
      "b": "This scenario requires security-specific restart planning: HSM availability and re-keying process testing, maintenance window extension for re-keying time, proper session invalidation, and startup configuration verification. This is the correct answer.",
      "c": "The maintenance window timing is one consideration — security-specific restart planning is also required for applications with cryptographic key material.",
      "d": "Reconstructing encryption keys from application logs would be a critical security vulnerability — keys should never appear in logs."
    }
  },
  {
    "id": 97,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "PKI",
    "difficulty": "easy",
    "text": "In a Public Key Infrastructure (PKI), what is the PRIMARY function of the public key?",
    "answers": [
      { "id": "a", "text": "To decrypt data that was encrypted with the private key" },
      { "id": "b", "text": "To encrypt data or verify digital signatures — it is shared openly and anyone can use it to send encrypted messages to the key owner or verify messages signed by the owner" },
      { "id": "c", "text": "To sign documents on behalf of the certificate holder" },
      { "id": "d", "text": "To authenticate the user to a server during TLS handshake" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Data encrypted with the private key is decrypted with the public key — but data encrypted with the public key is decrypted with the private key. This reversal is important.",
      "b": "The public key has two uses: encrypting data that only the private key holder can decrypt, and verifying digital signatures created by the matching private key. It is distributed freely. This is the correct answer.",
      "c": "Signing documents uses the private key — the public key verifies signatures, not creates them.",
      "d": "During TLS, the server's public key is used by the client to encrypt the pre-master secret — but the broader answer is that public keys encrypt and verify."
    }
  },
  {
    "id": 98,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "PKI",
    "difficulty": "medium",
    "text": "What is key escrow in a PKI environment and why might an organization implement it?",
    "answers": [
      { "id": "a", "text": "Key escrow is the process of distributing public keys to all network users" },
      { "id": "b", "text": "Key escrow involves storing a copy of private keys with a trusted third party or internal escrow agent — enabling recovery of encrypted data if the original key holder loses their key, leaves the organization, or is unavailable, while maintaining business continuity" },
      { "id": "c", "text": "Key escrow is a method of encrypting private keys with the corresponding public key" },
      { "id": "d", "text": "Key escrow refers to the expiration and renewal process for digital certificates" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Distributing public keys is a standard PKI operation — key escrow specifically involves private key backup with a trusted party.",
      "b": "Key escrow stores private keys securely with an escrow agent so encrypted data remains recoverable if the primary key holder is unavailable. This balances data recovery needs against key security. This is the correct answer.",
      "c": "Encrypting private keys with public keys would be circular — private keys are protected through their own secure storage.",
      "d": "Certificate expiration and renewal is certificate lifecycle management — not key escrow."
    }
  },
  {
    "id": 99,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "PKI",
    "difficulty": "hard",
    "text": "An organization implements key escrow for employee encryption keys. A law enforcement agency presents a court order requiring access to encrypted communications of a specific employee under investigation. How does key escrow enable compliance while presenting a security risk?",
    "answers": [
      { "id": "a", "text": "Key escrow has no security risks — it is a purely beneficial capability" },
      { "id": "b", "text": "Key escrow enables compliance by providing lawful access to escrowed private keys for authorized legal requests. The security risk is that the escrow system becomes a high-value target — compromise of the escrow agent gives attackers access to all escrowed private keys, decrypting all communications protected by those keys. The escrow system itself must be extremely well-secured" },
      { "id": "c", "text": "Law enforcement access to escrowed keys is illegal regardless of court orders" },
      { "id": "d", "text": "Key escrow provides access only to future communications — past encrypted data cannot be decrypted" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Key escrow creates significant security risks — the escrow system concentrates access to all private keys, making it an extremely valuable target.",
      "b": "Key escrow enables lawful access (beneficial for compliance) while creating a concentrated target for attackers. The security of the escrow system is paramount — a breach exposes all escrowed communications. This is the correct answer.",
      "c": "Key escrow can legally be required to comply with court orders — this is one of its primary use cases in regulated industries.",
      "d": "Escrowed keys decrypt past encrypted data as well as future — private keys are used to decrypt any data encrypted with the corresponding public key."
    }
  },
  {
    "id": 100,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "PKI",
    "difficulty": "hard",
    "text": "An organization's PKI uses a two-tier hierarchy with an offline root CA and an online issuing CA. The root CA's private key is stored on an HSM in an air-gapped system. An administrator proposes bringing the root CA online to simplify certificate issuance. What is the PRIMARY security risk of this proposal?",
    "answers": [
      { "id": "a", "text": "Bringing the root CA online would slow down certificate issuance" },
      { "id": "b", "text": "The root CA's private key is the ultimate trust anchor — if an online root CA is compromised, all certificates issued by the entire PKI hierarchy become untrusted, requiring complete PKI rebuild. Keeping the root CA offline protects this key from network-based attacks, limiting compromise risk to physical access only" },
      { "id": "c", "text": "Online root CAs violate RFC standards and are technically prohibited" },
      { "id": "d", "text": "The root CA should be online for certificate revocation to function properly" }
    ],
    "correct": "b",
    "explanations": {
      "a": "An online root CA would actually speed up direct certificate issuance — but this is precisely the risk, as it increases attack surface.",
      "b": "The root CA's private key is the most critical element in the PKI — its compromise invalidates the entire trust hierarchy. Air-gapping limits the attack surface to physical access, dramatically reducing compromise risk. This is the correct answer.",
      "c": "Online root CAs are technically possible — the offline requirement is a security best practice, not an RFC prohibition.",
      "d": "Certificate revocation is handled by issuing/subordinate CAs and OCSP responders — the root CA does not need to be online for revocation to function."
    }
  },
  {
    "id": 101,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Encryption Levels",
    "difficulty": "easy",
    "text": "A company policy requires that all laptop hard drives be protected so that if a laptop is stolen, the data cannot be accessed even if the drive is removed and connected to another system. Which encryption level BEST meets this requirement?",
    "answers": [
      { "id": "a", "text": "File-level encryption — protecting individual sensitive files" },
      { "id": "b", "text": "Full-disk encryption (FDE) — encrypting the entire drive including OS, applications, and all data, preventing access to any content without the decryption key even if the drive is removed" },
      { "id": "c", "text": "Volume encryption — protecting a specific partition or volume" },
      { "id": "d", "text": "Database encryption — protecting structured data in databases" }
    ],
    "correct": "b",
    "explanations": {
      "a": "File-level encryption protects individual files — an attacker accessing the drive would still see OS files, application data, temp files, and any unencrypted files.",
      "b": "Full-disk encryption protects all data on the entire drive at the physical level — removing the drive yields only encrypted data with no accessible content. This is the correct answer.",
      "c": "Volume encryption protects a specific volume — other volumes/partitions remain unencrypted and accessible.",
      "d": "Database encryption protects database contents — other files on the drive remain accessible."
    }
  },
  {
    "id": 102,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Encryption Levels",
    "difficulty": "medium",
    "text": "A healthcare organization stores patient records in a database. Some records belong to public figures, and the organization wants to ensure that even database administrators cannot read specific high-sensitivity records. Which encryption level provides this granularity?",
    "answers": [
      { "id": "a", "text": "Full-disk encryption — encrypting the entire server disk" },
      { "id": "b", "text": "Record-level encryption — encrypting individual database records with keys that even DBAs do not possess, ensuring only authorized applications or users with the specific record key can decrypt individual records" },
      { "id": "c", "text": "Database-level encryption — encrypting the entire database" },
      { "id": "d", "text": "Volume encryption — encrypting the storage volume containing the database" }
    ],
    "correct": "b",
    "explanations": {
      "a": "FDE protects against physical theft — DBAs with OS access can still access the database.",
      "b": "Record-level encryption applies cryptographic protection to individual records with distinct keys — even DBAs with full database access cannot read records they don't have the specific decryption key for. This is the correct answer.",
      "c": "Database-level encryption protects the database from external access — DBAs with database credentials can still read all records.",
      "d": "Volume encryption protects the storage medium — authorized database users can still access all records."
    }
  },
  {
    "id": 103,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Encryption Levels",
    "difficulty": "hard",
    "text": "A security architect is designing data protection for a multi-tenant cloud application. Tenants' data must be isolated so that one tenant's breach cannot expose another's data. Which layered encryption approach BEST achieves this?",
    "answers": [
      { "id": "a", "text": "Full-disk encryption on the cloud servers protects all tenant data" },
      { "id": "b", "text": "Implement tenant-specific encryption at the database or record level using per-tenant encryption keys stored in a tenant-isolated key management system. Each tenant's data is encrypted with a unique key — even if one tenant's data is accessed through a vulnerability, the encryption of other tenants' data with different keys prevents cross-tenant exposure" },
      { "id": "c", "text": "File-level encryption on tenant data directories provides sufficient isolation" },
      { "id": "d", "text": "Network isolation between tenant VLANs eliminates the need for data-level encryption" }
    ],
    "correct": "b",
    "explanations": {
      "a": "FDE protects against physical media theft — it does not provide tenant isolation at the application or database level.",
      "b": "Per-tenant encryption keys at the database/record level ensure that even application-level vulnerabilities accessing another tenant's encrypted data yield only unintelligible ciphertext without the tenant-specific key. This is the correct answer.",
      "c": "File-level encryption with shared filesystem access by the application may not prevent application-layer cross-tenant access.",
      "d": "Network isolation prevents network-based lateral movement — but application vulnerabilities can still access other tenants' unencrypted database records."
    }
  },
  {
    "id": 104,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Encryption Levels",
    "difficulty": "hard",
    "text": "An organization implements transparent database encryption (TDE). A DBA with full database access exports a backup and copies it to an external drive. Does TDE protect this data?",
    "answers": [
      { "id": "a", "text": "Yes — TDE encrypts all data including backups, making the exported copy unreadable" },
      { "id": "b", "text": "It depends on the TDE implementation: some TDE solutions encrypt backups in a way that is transparent to authorized users — if the backup is restored by an authorized user with the correct TDE key, it decrypts automatically. If the external drive is accessed without the TDE key, the backup may be protected. However, if the DBA also exports the TDE key, both the data and key are compromised — TDE does not address insider threats with key access" },
      { "id": "c", "text": "TDE only protects data at rest on the database server — backups are always unencrypted" },
      { "id": "d", "text": "TDE protects against all insider threats including authorized DBAs" }
    ],
    "correct": "b",
    "explanations": {
      "a": "TDE backup protection depends on key management — if the key accompanies the backup, protection is lost.",
      "b": "TDE's protection of backups depends on whether the key is separately controlled. TDE does not protect against insiders who have both data and key access — this is an inherent limitation of transparent encryption against privileged insiders. This is the correct answer.",
      "c": "Many TDE implementations do encrypt backups — but key management determines whether the backup is truly protected.",
      "d": "TDE is transparent to authorized users by design — authorized DBAs with key access can read all data, including backups."
    }
  },
  {
    "id": 105,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Encryption Types",
    "difficulty": "easy",
    "text": "What is the PRIMARY difference between symmetric and asymmetric encryption?",
    "answers": [
      { "id": "a", "text": "Symmetric encryption uses longer keys and is therefore more secure" },
      { "id": "b", "text": "Symmetric encryption uses the same key for both encryption and decryption; asymmetric encryption uses a mathematically related key pair — a public key for encryption and a private key for decryption (or vice versa for signatures)" },
      { "id": "c", "text": "Asymmetric encryption is always used for bulk data while symmetric is for key exchange" },
      { "id": "d", "text": "Symmetric encryption is newer and replaces asymmetric encryption in modern systems" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Symmetric keys are typically shorter than asymmetric keys for equivalent security — e.g., AES-256 vs RSA-2048.",
      "b": "The fundamental distinction is the key structure: symmetric (one shared key) vs. asymmetric (mathematically related key pair). This determines use cases, performance, and key distribution approaches. This is the correct answer.",
      "c": "In hybrid cryptography, asymmetric is used for key exchange and symmetric for bulk data — but this is a common usage pattern, not the definitional difference.",
      "d": "Both types are used in modern systems — they serve complementary roles and neither replaces the other."
    }
  },
  {
    "id": 106,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Encryption Types",
    "difficulty": "medium",
    "text": "HTTPS uses a hybrid encryption approach during the TLS handshake. Why is asymmetric encryption used for key exchange rather than encrypting all HTTPS traffic?",
    "answers": [
      { "id": "a", "text": "Asymmetric encryption is more secure than symmetric and should be used exclusively" },
      { "id": "b", "text": "Asymmetric encryption is computationally expensive — encrypting large volumes of traffic with RSA or ECC would create significant performance overhead. Asymmetric encryption is used to securely exchange a symmetric session key during the handshake; symmetric encryption then handles the bulk data transfer efficiently" },
      { "id": "c", "text": "Asymmetric encryption cannot encrypt data, only keys" },
      { "id": "d", "text": "TLS does not use symmetric encryption — only asymmetric throughout the session" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Both types provide strong security — asymmetric is not more secure for bulk encryption, just mathematically different.",
      "b": "The performance characteristics drive hybrid use: asymmetric encryption is orders of magnitude slower than symmetric for bulk data. Hybrid approaches leverage asymmetric for the key exchange problem (no shared secret needed) and symmetric for efficient bulk encryption. This is the correct answer.",
      "c": "Asymmetric encryption can encrypt arbitrary data — but the performance cost makes it impractical for bulk traffic.",
      "d": "TLS uses symmetric encryption for the bulk of the session data — asymmetric is only used during the handshake phase."
    }
  },
  {
    "id": 107,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Encryption Types",
    "difficulty": "hard",
    "text": "A security team evaluates two encryption algorithm options: RSA-2048 and AES-256. For protecting 10TB of archived medical records at rest, which is more appropriate and why?",
    "answers": [
      { "id": "a", "text": "RSA-2048 because it uses asymmetric encryption which is more secure" },
      { "id": "b", "text": "AES-256 because symmetric encryption is significantly faster for bulk data encryption and AES-256 provides equivalent or greater security than RSA-2048 for data at rest. RSA-2048 is more appropriate for key exchange or digital signatures, not bulk data encryption" },
      { "id": "c", "text": "RSA-2048 because the 2048-bit key is longer than 256 bits making it stronger" },
      { "id": "d", "text": "Both provide identical performance — the choice is purely preference" }
    ],
    "correct": "b",
    "explanations": {
      "a": "RSA security does not translate to suitability for bulk data — AES-256 is appropriate and efficient for large data at rest.",
      "b": "AES-256 is the correct choice: symmetric encryption is orders of magnitude faster for bulk data, AES-256 provides equivalent security to RSA-2048 or better for symmetric use cases, and RSA is designed for key exchange and signatures, not bulk encryption of 10TB datasets. This is the correct answer.",
      "c": "Key length comparison between symmetric and asymmetric algorithms is not valid — 256-bit AES and 2048-bit RSA provide comparable but different security levels. Bit count alone does not determine strength across algorithm types.",
      "d": "Performance difference between RSA and AES for bulk data encryption is dramatic — AES is vastly faster, making RSA impractical for 10TB."
    }
  },
  {
    "id": 108,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Encryption Types",
    "difficulty": "hard",
    "text": "An organization must select an encryption algorithm for a new IoT device with severely limited computational resources (8-bit microcontroller, 256 bytes RAM). Which consideration MOST influences the algorithm selection?",
    "answers": [
      { "id": "a", "text": "Always use AES-256 regardless of hardware constraints" },
      { "id": "b", "text": "Lightweight symmetric encryption algorithms designed for constrained environments (such as ChaCha20, PRESENT, or lightweight AES modes) should be evaluated. Key length and algorithm complexity must be balanced against the device's computational limitations — a theoretically stronger algorithm that cannot run on the device provides no security" },
      { "id": "c", "text": "IoT devices do not need encryption since they only transmit telemetry data" },
      { "id": "d", "text": "RSA-4096 provides the best security for IoT devices" }
    ],
    "correct": "b",
    "explanations": {
      "a": "AES-256 may exceed the computational and memory capabilities of severely constrained IoT hardware — implementation may be impossible or insecure if resources are insufficient.",
      "b": "Resource-constrained cryptography is a specialized field — the strongest feasible algorithm for the specific hardware profile must be selected. An algorithm that cannot be properly implemented provides no security. This is the correct answer.",
      "c": "IoT telemetry data often carries sensitive information about industrial processes, user behavior, or physical environments — encryption is necessary.",
      "d": "RSA-4096 is even more computationally demanding than AES-256 — entirely impractical for an 8-bit microcontroller with 256 bytes RAM."
    }
  },
  {
    "id": 109,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "TPM",
    "difficulty": "easy",
    "text": "What is a Trusted Platform Module (TPM) and what security function does it primarily provide?",
    "answers": [
      { "id": "a", "text": "A TPM is a software-based encryption library installed on servers" },
      { "id": "b", "text": "A TPM is a dedicated hardware security chip integrated into computing devices that provides a hardware root of trust — securely storing cryptographic keys, performing cryptographic operations, and enabling platform integrity measurements to detect unauthorized changes to the boot process" },
      { "id": "c", "text": "A TPM is a network device that manages encryption keys across an enterprise" },
      { "id": "d", "text": "A TPM is a type of firewall that protects trusted platforms" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A TPM is a hardware chip — not a software library.",
      "b": "The TPM is a dedicated security microcontroller built into (or attached to) a motherboard that provides hardware-rooted cryptographic capabilities including secure key storage, platform integrity measurements (PCR registers), and remote attestation. This is the correct answer.",
      "c": "Enterprise key management is handled by dedicated key management systems — a TPM is a device-specific chip, not a network device.",
      "d": "TPM stands for Trusted Platform Module — it is not a firewall."
    }
  },
  {
    "id": 110,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "TPM",
    "difficulty": "medium",
    "text": "A company uses BitLocker full-disk encryption with TPM. An attacker steals a laptop and attempts to access the data by removing the drive and connecting it to another system. How does the TPM protect the data in this scenario?",
    "answers": [
      { "id": "a", "text": "The TPM provides no protection if the drive is removed — it only protects from software attacks" },
      { "id": "b", "text": "The BitLocker encryption key is sealed to the TPM and can only be released when the TPM measurements confirm the correct boot environment on the original hardware. Removing the drive to another system means the correct TPM is absent — the drive cannot be decrypted without the original TPM (and PIN/key if configured)" },
      { "id": "c", "text": "The TPM remotely wipes the drive when it detects removal" },
      { "id": "d", "text": "The TPM locks the drive permanently after 3 failed decryption attempts" }
    ],
    "correct": "b",
    "explanations": {
      "a": "TPM-sealed keys are specifically designed to protect against drive removal attacks — the key is hardware-bound to the original TPM.",
      "b": "BitLocker's TPM binding seals the volume master key to the TPM and specific platform measurements. Without the original TPM present and producing the correct measurements, the key cannot be retrieved and the drive remains encrypted. This is the correct answer.",
      "c": "TPMs do not perform remote wipe — they secure keys through hardware binding.",
      "d": "TPM lockout after failed PIN attempts is a separate feature — the fundamental protection is key sealing to the hardware."
    }
  },
  {
    "id": 111,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "TPM",
    "difficulty": "hard",
    "text": "A security team performs remote attestation using TPM Platform Configuration Register (PCR) values. A server's current PCR values do not match the expected values from a known-good baseline. What does this indicate and what should the security response be?",
    "answers": [
      { "id": "a", "text": "PCR mismatches are normal and occur during routine software updates — no action required" },
      { "id": "b", "text": "PCR mismatch indicates the server's boot sequence has changed since the baseline was established — possible causes include unauthorized firmware modification, bootkit/rootkit infection, or legitimate software updates that were not baselined. The security response should be to quarantine the server, perform forensic investigation to determine whether the change was authorized, and establish a new baseline only after confirming the system integrity" },
      { "id": "c", "text": "PCR mismatch means the TPM chip has failed and should be replaced" },
      { "id": "d", "text": "PCR values are not security-relevant — they only track hardware inventory" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Software updates do change PCR values — which is why baseline updates must accompany authorized changes. An unexpected mismatch requires investigation.",
      "b": "PCR values measure boot integrity — unexpected changes may indicate malicious modification or unauthorized changes. The response requires investigation before accepting the new state. This is the correct answer.",
      "c": "PCR mismatches reflect changes in measured components, not TPM chip failure — chip failure produces different error conditions.",
      "d": "PCR values are a primary integrity measurement mechanism — they are security-critical for detecting boot-level compromises."
    }
  },
  {
    "id": 112,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "TPM",
    "difficulty": "hard",
    "text": "A developer proposes using a TPM to store API keys for a cloud service application running on a server. A security architect questions whether this is the right use case for TPM. What is the MOST accurate assessment?",
    "answers": [
      { "id": "a", "text": "TPMs are perfect for all key storage use cases including application API keys" },
      { "id": "b", "text": "TPMs are optimized for platform integrity measurements and storing keys tied to the platform boot state (like FDE keys). Storing application API keys in TPM is technically possible but may not leverage TPM's strengths — an HSM or dedicated secrets management solution (HashiCorp Vault, cloud KMS) is typically more appropriate for application-level key storage, providing better key rotation, access control, and auditability for application credentials" },
      { "id": "c", "text": "TPMs cannot store any type of key other than BitLocker volume master keys" },
      { "id": "d", "text": "API keys should always be stored in environment variables — hardware security is unnecessary for API keys" }
    ],
    "correct": "b",
    "explanations": {
      "a": "While TPMs can store keys, they are not optimized for all key storage scenarios — particularly application-level credentials.",
      "b": "TPM strengths are in platform binding and integrity measurement. Application API keys benefit more from HSMs or secrets managers offering rotation, fine-grained access control, audit logging, and multi-application access. This is the correct answer.",
      "c": "TPMs can store various cryptographic keys beyond BitLocker keys — but application-level API keys are better served by dedicated secrets management.",
      "d": "Environment variables are among the least secure methods for storing API keys — hardware or managed secret storage is strongly preferred."
    }
  },
  {
    "id": 113,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "HSM",
    "difficulty": "easy",
    "text": "What is a Hardware Security Module (HSM) and what security advantage does it provide over software-based key storage?",
    "answers": [
      { "id": "a", "text": "An HSM is a high-performance server that speeds up encryption operations" },
      { "id": "b", "text": "An HSM is a dedicated hardware device that generates, stores, and manages cryptographic keys entirely within the physical device — private keys never leave the HSM in plaintext, and the device is tamper-resistant and tamper-evident, making key extraction extremely difficult even for an attacker with physical access" },
      { "id": "c", "text": "An HSM is a software encryption library with a hardware accelerator" },
      { "id": "d", "text": "An HSM is a network firewall that encrypts traffic between network segments" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Performance acceleration is a secondary benefit — the primary value is secure key storage and tamper resistance.",
      "b": "HSMs provide hardware-rooted key protection: private keys are generated and stored within the physical boundary of the device, cryptographic operations are performed inside the HSM, and physical tamper resistance prevents key extraction even by attackers with physical access. This is the correct answer.",
      "c": "An HSM performs cryptographic operations entirely in hardware — it is not a software library.",
      "d": "Network encryption appliances are different from HSMs — HSMs specifically address key lifecycle management and cryptographic operations."
    }
  },
  {
    "id": 114,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "HSM",
    "difficulty": "medium",
    "text": "A certificate authority uses an HSM to store its CA private key. A server administrator attempts to export the CA private key from the HSM for backup purposes. The export fails with an access denied error. Why does this occur and is it the correct behavior?",
    "answers": [
      { "id": "a", "text": "The export failure is a malfunction — HSMs should allow key export for backup" },
      { "id": "b", "text": "This is correct and expected behavior — HSMs are specifically designed to prevent private key export in plaintext. The key is protected within the hardware boundary. Backup is accomplished through encrypted key backup mechanisms (wrapped key export with a backup key) — not plaintext extraction. The error demonstrates the HSM working as intended" },
      { "id": "c", "text": "The administrator needs root access on the HSM operating system to export keys" },
      { "id": "d", "text": "HSMs do not support backup at all — the key is lost if the HSM fails" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Preventing plaintext key export is a core HSM security feature — it is not a malfunction.",
      "b": "HSMs prevent plaintext key export by design — this is the primary protection mechanism. Authorized backup uses wrapped key export (key encrypted with a backup key) that cannot be used without the HSM. This is the correct answer.",
      "c": "Root access does not bypass HSM security controls — the HSM's security boundary is hardware-enforced.",
      "d": "HSMs support encrypted (wrapped) key backup — plaintext export is prohibited, not all backup."
    }
  },
  {
    "id": 115,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "HSM",
    "difficulty": "hard",
    "text": "A cloud provider offers a cloud HSM service. A customer's security team debates whether a cloud HSM provides equivalent security to an on-premises HSM. What is the MOST accurate security analysis?",
    "answers": [
      { "id": "a", "text": "Cloud HSMs are always less secure than on-premises HSMs due to network exposure" },
      { "id": "b", "text": "Cloud HSMs (AWS CloudHSM, Azure Dedicated HSM) use validated hardware (FIPS 140-2 Level 3) with customer-exclusive key control — the cloud provider cannot access customer keys. Security differences include: physical access to hardware is controlled by the provider (not customer); network access introduces an attack path not present with on-premises HSMs. For most use cases, cloud HSMs meet enterprise security requirements; highly sensitive applications may prefer on-premises for physical control" },
      { "id": "c", "text": "Cloud HSMs provide superior security since cloud providers have better physical security than most enterprises" },
      { "id": "d", "text": "Cloud HSMs and software key storage are equivalent — the hardware is in the cloud anyway" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Cloud HSMs use validated hardware and provide strong security — the comparison requires nuanced analysis, not blanket dismissal.",
      "b": "Cloud HSMs provide strong security with some differences from on-premises: customer-exclusive key control, validated hardware, but physical access by the provider's staff and network access as an additional attack surface. This is the correct answer.",
      "c": "Cloud provider physical security is excellent — but the customer still loses direct physical control of the hardware.",
      "d": "Cloud HSMs provide hardware-rooted security fundamentally different from software key storage — comparing them incorrectly trivializes hardware security."
    }
  },
  {
    "id": 116,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "HSM",
    "difficulty": "hard",
    "text": "A payment processing application generates 10,000 cryptographic signing operations per second using RSA-2048. The software-based signing is consuming 80% of CPU capacity. An HSM is proposed to address this. Beyond key security, what additional benefit does HSM offloading provide?",
    "answers": [
      { "id": "a", "text": "HSMs slow down cryptographic operations — they should not be used for high-volume applications" },
      { "id": "b", "text": "HSMs contain dedicated cryptographic processors (specialized ASICs) optimized for cryptographic operations — offloading 10,000 signing operations per second to an HSM frees CPU resources on the application servers while potentially achieving better performance than software-based cryptography. The HSM handles cryptographic workloads efficiently while simultaneously providing key security" },
      { "id": "c", "text": "HSMs eliminate the need for CPU on application servers" },
      { "id": "d", "text": "HSM offloading reduces network bandwidth requirements" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Modern HSMs with dedicated cryptographic ASICs are often faster than general-purpose CPU implementations for cryptographic operations.",
      "b": "HSMs contain purpose-built cryptographic processors that handle signing and other operations efficiently — offloading cryptographic work frees application server CPU while maintaining or improving performance. This dual benefit (security + performance) is a key HSM value proposition. This is the correct answer.",
      "c": "Application servers still need CPU for application logic — HSMs offload only cryptographic operations.",
      "d": "HSM offloading does not reduce network bandwidth — it offloads computational work, not network traffic."
    }
  },
  {
    "id": 117,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Key Management System",
    "difficulty": "easy",
    "text": "What is the PRIMARY purpose of a key management system (KMS) in an enterprise?",
    "answers": [
      { "id": "a", "text": "To encrypt all network traffic between enterprise systems" },
      { "id": "b", "text": "To centrally manage the full lifecycle of cryptographic keys — including generation, storage, distribution, rotation, revocation, and destruction — ensuring consistent key policies across the enterprise and reducing the risk of keys being lost, compromised, or improperly managed" },
      { "id": "c", "text": "To replace HSMs with a software-only alternative" },
      { "id": "d", "text": "To manage user passwords and authentication credentials" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Network encryption is a separate function — KMS manages the keys that may be used for network encryption among other purposes.",
      "b": "A KMS provides centralized key lifecycle management — ensuring keys are properly generated, securely stored, distributed to authorized systems, rotated on schedule, and properly retired. This is the correct answer.",
      "c": "KMS and HSM serve different functions — KMS manages key lifecycle, HSM provides hardware security for key operations. Many KMS solutions use HSMs as their secure backend.",
      "d": "Password management is handled by password managers and identity systems — KMS manages cryptographic keys, not authentication credentials."
    }
  },
  {
    "id": 118,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Key Management System",
    "difficulty": "medium",
    "text": "An organization uses a cloud KMS where encryption keys are managed by the cloud provider. A compliance auditor raises a concern about this arrangement. What is the MOST valid security concern?",
    "answers": [
      { "id": "a", "text": "Cloud KMS is always insecure and should never be used" },
      { "id": "b", "text": "Provider-managed KMS means the cloud provider controls the keys protecting your data — in a legal dispute with the provider, or if the provider is compromised or receives a government order, your data could potentially be accessed without your consent. Customer-managed keys (CMEK) or an external KMS where the customer controls all keys addresses this concern" },
      { "id": "c", "text": "Cloud KMS cannot support key rotation — this is the auditor's concern" },
      { "id": "d", "text": "Cloud KMS has no valid use case — all enterprises should use on-premises KMS" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Cloud KMS can be appropriately secure depending on the threat model and key control arrangement.",
      "b": "The valid concern is key sovereignty — who ultimately controls access to the keys determines who controls access to the encrypted data. Provider-managed keys mean the provider could access data under certain circumstances. Customer-managed keys (CMEK) address this. This is the correct answer.",
      "c": "Cloud KMS solutions fully support automated key rotation — this is not the auditor's primary concern.",
      "d": "Cloud KMS is widely and appropriately used — the concern is about key ownership, not deployment model."
    }
  },
  {
    "id": 119,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Key Management System",
    "difficulty": "hard",
    "text": "An organization's KMS policy requires automatic key rotation every 90 days for data encryption keys. During a quarterly audit, 12 keys are found to be 95 days old without rotation. What security risks does this key rotation failure create?",
    "answers": [
      { "id": "a", "text": "Key age has no security impact — the same key can be used indefinitely" },
      { "id": "b", "text": "Delayed key rotation increases the risk associated with key compromise — the longer a key is in use, the more data is protected by that single key, and the more time an attacker with the key has to decrypt data. If the key was compromised at day 60, 35 additional days of data encrypted with the compromised key becomes accessible. Regular rotation limits the data exposure window per key" },
      { "id": "c", "text": "Key rotation only matters for asymmetric keys — symmetric data encryption keys can be permanent" },
      { "id": "d", "text": "The risk is only compliance-based — there is no operational security impact from delayed rotation" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Key longevity directly affects security — the longer a key is used, the more data is at risk if it is compromised.",
      "b": "Key rotation limits the blast radius of key compromise — if a key is compromised, only data encrypted during that key's validity period is exposed. Delayed rotation extends this window and increases the amount of data at risk. This is the correct answer.",
      "c": "Symmetric data encryption keys also benefit from rotation — the principle of limiting data per key applies regardless of key type.",
      "d": "The operational security impact is real — delayed rotation extends data exposure windows beyond policy-defined acceptable limits."
    }
  },
  {
    "id": 120,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Key Management System",
    "difficulty": "hard",
    "text": "A secure enclave is used by a cloud application to process sensitive credit card data. The enclave's attestation report is verified before any data is sent to it. What does the attestation report verify, and why is this critical for data security?",
    "answers": [
      { "id": "a", "text": "The attestation report verifies that the enclave has sufficient CPU and memory resources" },
      { "id": "b", "text": "The attestation report cryptographically verifies that: (1) the enclave code is exactly the expected code (measured and signed); (2) the enclave is running in a genuine hardware-protected environment; and (3) the security configuration is correct. This is critical because it ensures sensitive credit card data is only sent to verified, unmodified code running in genuine hardware isolation — preventing data from reaching compromised or malicious enclaves" },
      { "id": "c", "text": "The attestation report verifies that the cloud provider has appropriate security certifications" },
      { "id": "d", "text": "Attestation only verifies network connectivity to the enclave — not code integrity" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Resource verification is operational — attestation is about code and hardware integrity.",
      "b": "Enclave attestation provides cryptographic proof of code integrity and genuine hardware protection — ensuring data is only sent to the exact expected code in a genuine hardware-isolated environment. This is the correct answer.",
      "c": "Attestation is a technical cryptographic verification — not a certification audit process.",
      "d": "Attestation goes far beyond network connectivity — it verifies the exact code identity and hardware environment."
    }
  },
  {
    "id": 121,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Steganography",
    "difficulty": "easy",
    "text": "What is steganography and how does it differ from encryption?",
    "answers": [
      { "id": "a", "text": "Steganography and encryption are the same — both protect data by making it unreadable" },
      { "id": "b", "text": "Steganography hides the existence of a message by concealing it within an ordinary-looking carrier (such as an image or audio file) without altering the carrier's apparent nature. Encryption protects the content of a message by making it unreadable — but it does not hide that encrypted data exists. Steganography hides the message; encryption hides the meaning" },
      { "id": "c", "text": "Steganography is a type of compression that reduces file sizes while concealing data" },
      { "id": "d", "text": "Steganography is only used by attackers — it has no legitimate security use" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Steganography and encryption address different security goals — hiding existence vs. protecting content.",
      "b": "The key distinction: steganography provides security through obscurity (the secret message appears to be a normal image/audio file), while encryption makes content unreadable but does not hide that secret data exists. Combining both provides stronger protection. This is the correct answer.",
      "c": "Steganography hides data within a carrier — it is not a compression technique.",
      "d": "Steganography has legitimate uses: digital watermarking, covert communication channels, and copyright protection."
    }
  },
  {
    "id": 122,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Steganography",
    "difficulty": "medium",
    "text": "An attacker embeds malware command-and-control instructions in image files posted to a public social media platform. When the malware on infected systems downloads and processes these images, it extracts hidden instructions. This technique is called:",
    "answers": [
      { "id": "a", "text": "SQL injection — the images contain SQL commands" },
      { "id": "b", "text": "Steganographic C2 — using steganography to hide malware command-and-control communications within innocuous-appearing image files, evading network detection tools that do not expect malicious data in image files from legitimate platforms" },
      { "id": "c", "text": "Buffer overflow — the images overflow the media player's buffer" },
      { "id": "d", "text": "Man-in-the-middle — the attacker intercepts the image download" }
    ],
    "correct": "b",
    "explanations": {
      "a": "SQL injection targets database query parsing — steganographic C2 embeds data in carrier files.",
      "b": "Steganographic C2 uses social media image files as an unwitting delivery channel for malware instructions — network security tools monitoring for C2 traffic often miss commands hidden in image files from legitimate platforms. This is the correct answer.",
      "c": "Buffer overflow exploits memory handling bugs — steganographic C2 hides data in carrier file content.",
      "d": "Man-in-the-middle intercepts communications in transit — steganographic C2 uses the content of legitimate-appearing files."
    }
  },
  {
    "id": 123,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Steganography",
    "difficulty": "hard",
    "text": "A digital forensics investigator is analyzing a suspected data exfiltration incident. The suspect sent thousands of images to an external email address. File analysis shows the images are valid JPEG files with normal metadata. How would the investigator determine if steganography was used?",
    "answers": [
      { "id": "a", "text": "The valid JPEG format proves no steganography was used" },
      { "id": "b", "text": "The investigator would use steganalysis tools to detect statistical anomalies in the image data: LSB (least significant bit) analysis looking for non-random bit patterns in pixel data, chi-square attacks comparing expected vs. actual bit distributions, and comparison against the original source images if available. Valid JPEG format does not rule out steganography — the carrier file remains valid while concealing hidden data" },
      { "id": "c", "text": "Normal metadata confirms no hidden data — steganography always modifies metadata" },
      { "id": "d", "text": "Steganography cannot be detected once data is embedded — investigation is futile" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Steganographic techniques specifically preserve file validity — valid format does not prove absence of hidden data.",
      "b": "Steganalysis detects statistical anomalies introduced by hidden data embedding — even valid files show detectable patterns from steganographic insertion. This is the correct answer.",
      "c": "Steganography often avoids modifying visible metadata — it hides data in image pixel data, not necessarily metadata.",
      "d": "Steganalysis is a well-developed field with effective detection techniques — detection is possible, especially for common steganographic tools."
    }
  },
  {
    "id": 124,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Steganography",
    "difficulty": "hard",
    "text": "A security team discovers that an insider is using an open-source steganography tool to hide sensitive documents within vacation photos before emailing them to a personal address. The organization has TLS inspection enabled on outbound email. Why did TLS inspection not detect this exfiltration?",
    "answers": [
      { "id": "a", "text": "TLS inspection would have detected the steganography — the system must have malfunctioned" },
      { "id": "b", "text": "TLS inspection decrypts and inspects email content, but it analyzes known malicious patterns in cleartext. Standard DLP and email security tools look for sensitive data in plaintext form within attachments — they typically cannot detect sensitive data hidden within binary image files using steganography. The exfiltrated data was not in a form the inspection engine could recognize" },
      { "id": "c", "text": "TLS inspection does not apply to email — it only inspects web traffic" },
      { "id": "d", "text": "The insider used a VPN that bypassed TLS inspection" }
    ],
    "correct": "b",
    "explanations": {
      "a": "TLS inspection has inherent limitations — it does not detect data hidden through steganography.",
      "b": "TLS inspection reveals cleartext content — but steganographically hidden data appears as normal pixel data in images. Standard DLP patterns do not match binary data hidden in image files. This is the correct answer.",
      "c": "TLS inspection can apply to email traffic — but the limitation is detection capability for steganography, not scope.",
      "d": "The scenario describes email through normal channels — VPN is not mentioned as a factor."
    }
  },
  {
    "id": 125,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Tokenization",
    "difficulty": "easy",
    "text": "What is tokenization and how does it protect sensitive data?",
    "answers": [
      { "id": "a", "text": "Tokenization encrypts sensitive data and stores the encrypted value in place of the original" },
      { "id": "b", "text": "Tokenization replaces sensitive data (such as a credit card number) with a non-sensitive placeholder (token) that has no meaningful relationship to the original value — the actual sensitive data is stored securely in a token vault, and the token can be used in systems that previously handled the sensitive data without exposing it" },
      { "id": "c", "text": "Tokenization is a method of compressing data to reduce storage requirements" },
      { "id": "d", "text": "Tokenization applies a one-way hash to data, making it irreversible" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Encryption transforms data using a mathematical function — tokenization substitutes with a random placeholder with no mathematical relationship to the original.",
      "b": "Tokenization substitutes sensitive data with a random token — the token has no value if stolen because there is no algorithmic way to derive the original data from it. The mapping is maintained in a secure vault. This is the correct answer.",
      "c": "Tokenization does not compress data — it substitutes sensitive values with non-sensitive placeholders.",
      "d": "Hashing is a one-way cryptographic operation — tokenization is reversible (via the vault) but uses random substitution rather than cryptographic transformation."
    }
  },
  {
    "id": 126,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Tokenization",
    "difficulty": "medium",
    "text": "A retailer tokenizes credit card numbers — replacing the 16-digit PAN with a random token. The token vault is breached, exposing the token-to-PAN mapping for all customers. What is the security impact?",
    "answers": [
      { "id": "a", "text": "No impact — tokens are useless without the original card numbers" },
      { "id": "b", "text": "Critical impact — the token vault breach exposes the complete token-to-PAN mapping, effectively reversing the tokenization and exposing all customer credit card numbers. The token vault is the most security-critical component of a tokenization system — its compromise nullifies all tokenization protection" },
      { "id": "c", "text": "Minimal impact — tokens can be reissued without customer disruption" },
      { "id": "d", "text": "Moderate impact — only tokens used in the last 30 days are exposed" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The token vault IS the mapping between tokens and original data — its breach allows de-tokenization of all records.",
      "b": "The token vault breach is catastrophic — it exposes the mapping that makes tokenization reversible, effectively exposing all credit card numbers that were tokenized. This illustrates that token vault security is paramount. This is the correct answer.",
      "c": "Reissuing tokens does not help if the current mapping is already exposed — all historical PANs are already compromised.",
      "d": "The token-to-PAN mapping persists for all records in the vault — not limited to recent tokens."
    }
  },
  {
    "id": 127,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Tokenization",
    "difficulty": "hard",
    "text": "A payment application stores credit card tokens instead of PANs. The application must still show the last 4 digits of the card for user recognition. What tokenization approach preserves this functionality while protecting the full PAN?",
    "answers": [
      { "id": "a", "text": "Store the full PAN alongside the token so the application can display the last 4 digits" },
      { "id": "b", "text": "Use format-preserving tokenization — the token retains the original data format (16 digits) and the last 4 digits are preserved in the token as readable digits while the first 12 are replaced with random values. This enables user recognition without storing the sensitive full PAN" },
      { "id": "c", "text": "Display a different card's last 4 digits — users cannot tell the difference" },
      { "id": "d", "text": "The application must choose between tokenization and displaying last 4 digits — both cannot be achieved simultaneously" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Storing the full PAN alongside the token negates tokenization's purpose — the PAN is still exposed.",
      "b": "Format-preserving tokenization (FPT) allows specific digits to be preserved (like the last 4) while tokenizing the rest — PCI DSS permits display of the last 4 digits, and FPT enables this while protecting the full PAN. This is the correct answer.",
      "c": "Displaying incorrect card digits would mislead users — this is fraudulent and unacceptable.",
      "d": "Format-preserving tokenization specifically enables both simultaneously — this limitation does not exist with proper tokenization techniques."
    }
  },
  {
    "id": 128,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Tokenization",
    "difficulty": "hard",
    "text": "A security architect compares tokenization vs. encryption for protecting a database of Social Security Numbers. For a use case where SSNs never need to be retrieved in their original form (only to verify that two records have the same SSN), which approach is MOST appropriate?",
    "answers": [
      { "id": "a", "text": "Tokenization — it is always better than encryption" },
      { "id": "b", "text": "For this use case — where the original value never needs to be recovered but equality checking is needed — deterministic encryption or hashing with a secret key (HMAC) is most appropriate. Tokenization can work but requires a vault lookup for comparison. Hashing with consistent salt allows equality comparison without storing a vault mapping or the ability to reverse to the original SSN" },
      { "id": "c", "text": "Plaintext storage is acceptable since SSNs are needed for comparison" },
      { "id": "d", "text": "Encryption is always better than tokenization for databases" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Tokenization is not universally superior — the appropriate choice depends on the specific use case.",
      "b": "When original value recovery is never needed and equality comparison is sufficient, deterministic hashing (HMAC with consistent input) or deterministic encryption provides equality checking without reversibility or vault dependency — more elegant for this specific use case. This is the correct answer.",
      "c": "Plaintext SSN storage violates data protection principles — SSNs are sensitive data requiring protection.",
      "d": "The optimal choice depends on use case — neither is universally superior."
    }
  },
  {
    "id": 129,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Data masking",
    "difficulty": "easy",
    "text": "What is data masking and what is its PRIMARY security purpose?",
    "answers": [
      { "id": "a", "text": "Data masking encrypts sensitive data before storing it in a database" },
      { "id": "b", "text": "Data masking replaces sensitive data with realistic-looking but fake values — such as replacing real customer names, SSNs, or credit card numbers with plausible substitute data — enabling development, testing, and analytics without exposing real sensitive information" },
      { "id": "c", "text": "Data masking applies a hash to sensitive fields making them irreversible" },
      { "id": "d", "text": "Data masking prevents unauthorized users from viewing database tables" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Encryption scrambles data using cryptographic functions — masking replaces data with fake but realistic substitutes.",
      "b": "Data masking substitutes real sensitive values with synthetic equivalents that maintain the same format and relational properties — allowing realistic application testing and analytics without exposing actual sensitive data. This is the correct answer.",
      "c": "Hashing is a one-way function — masking is typically reversible or uses substitution that maintains data structure.",
      "d": "Access control restricts who can view tables — masking modifies the data content visible to authorized users."
    }
  },
  {
    "id": 130,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Data masking",
    "difficulty": "medium",
    "text": "A healthcare developer needs production-like patient data to test a new application. The organization uses dynamic data masking. How does dynamic data masking differ from static data masking in this scenario?",
    "answers": [
      { "id": "a", "text": "Dynamic and static data masking are identical — both replace data before the developer accesses it" },
      { "id": "b", "text": "Static masking creates a separate masked copy of the database for development use — the original data remains unchanged. Dynamic masking applies masking rules in real time at query time — unauthorized users see masked values from the live database while authorized users see real values, all from the same database without creating copies" },
      { "id": "c", "text": "Dynamic masking is less secure than static masking" },
      { "id": "d", "text": "Static masking can only be applied to text fields while dynamic masking works for all data types" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Static and dynamic masking are fundamentally different approaches with different operational characteristics.",
      "b": "Static masking creates a separate masked dataset for development (original data untouched). Dynamic masking masks data in real time at the query layer — the same production database serves different views based on user permissions. This is the correct answer.",
      "c": "Dynamic masking provides equivalent data protection — the security model differs but neither is inherently less secure.",
      "d": "Both types support various data types — this limitation does not exist."
    }
  },
  {
    "id": 131,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Data masking",
    "difficulty": "hard",
    "text": "A data analyst receives a masked dataset for analytics. The dataset masks names and SSNs but retains ZIP codes, birth dates, and medical conditions. A researcher discovers they can re-identify 87% of records by combining these three fields. What type of privacy attack does this represent?",
    "answers": [
      { "id": "a", "text": "SQL injection — the analyst is querying the database directly" },
      { "id": "b", "text": "Re-identification or de-anonymization — combining quasi-identifiers (ZIP code + birth date + condition) that individually seem non-sensitive can uniquely identify specific individuals. This demonstrates that effective data masking must consider the combination of retained fields, not just mask obviously identifying fields" },
      { "id": "c", "text": "Man-in-the-middle — the analyst is intercepting data in transit" },
      { "id": "d", "text": "Brute force — the analyst is guessing individual identities" }
    ],
    "correct": "b",
    "explanations": {
      "a": "No SQL injection is involved — the analyst is using legitimately provided data.",
      "b": "Latanya Sweeney's famous research showed that ZIP code, birth date, and sex uniquely identify 87% of US residents. This is a re-identification attack on improperly anonymized data — masking only direct identifiers is insufficient. This is the correct answer.",
      "c": "No network interception is involved — the attack uses the provided dataset directly.",
      "d": "No guessing is needed — the combination of quasi-identifiers provides unique identification."
    }
  },
  {
    "id": 132,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Data masking",
    "difficulty": "hard",
    "text": "An organization implements data masking for customer data shared with a third-party analytics partner. The masking algorithm is deterministic — the same input always produces the same masked output. A security reviewer flags this as a risk. Why?",
    "answers": [
      { "id": "a", "text": "Deterministic masking is always more secure than random masking" },
      { "id": "b", "text": "Deterministic masking enables linkage attacks — if the analytics partner also receives masked data from a different source using the same deterministic masking, identical masked values across datasets reveal that they represent the same individual, enabling re-identification without ever knowing the original value. Random (non-deterministic) masking prevents this cross-dataset linking" },
      { "id": "c", "text": "Deterministic masking violates GDPR automatically" },
      { "id": "d", "text": "The security reviewer is incorrect — deterministic masking is required for analytics" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Deterministic masking enables dataset linkage — random masking provides better privacy protection for cross-dataset scenarios.",
      "b": "Deterministic masking's consistency enables dataset linking — the same person masked the same way in two datasets allows correlation without de-masking. Random masking prevents this at the cost of cross-dataset comparison capability. This is the correct answer.",
      "c": "Deterministic masking compliance with GDPR depends on the overall implementation — it is not automatically non-compliant.",
      "d": "Analytics can often work with non-deterministic masking — and when cross-dataset linking is needed, privacy-preserving techniques like differential privacy may be more appropriate."
    }
  },
  {
    "id": 133,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Hashing",
    "difficulty": "easy",
    "text": "What is the PRIMARY security property that makes cryptographic hashing useful for verifying data integrity?",
    "answers": [
      { "id": "a", "text": "Hashes are reversible, allowing recovery of the original data if needed" },
      { "id": "b", "text": "A cryptographic hash function produces a fixed-size digest from input data where any change to the input — even a single bit — produces a completely different hash. This deterministic, collision-resistant one-way function enables verification that data has not been modified" },
      { "id": "c", "text": "Hashes encrypt data during transmission to prevent eavesdropping" },
      { "id": "d", "text": "Hashes compress large files to reduce storage requirements" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Cryptographic hashes are one-way — they cannot be reversed to recover the original input.",
      "b": "The avalanche effect (tiny input changes cause dramatically different hashes) and collision resistance make hashes valuable for integrity verification — comparing hashes before and after confirms data has not changed. This is the correct answer.",
      "c": "Hashing does not encrypt — it creates a fixed-size fingerprint. Encryption is a separate process.",
      "d": "Hashes do not compress data — the hash digest is fixed-size regardless of input size and is used for verification, not storage."
    }
  },
  {
    "id": 134,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Hashing",
    "difficulty": "medium",
    "text": "A password database stores SHA-256 hashes of user passwords. An attacker obtains the database and uses a rainbow table containing precomputed SHA-256 hashes of common passwords. Many passwords are cracked quickly. What does this demonstrate about using unsalted hashing for password storage?",
    "answers": [
      { "id": "a", "text": "SHA-256 is too weak for password hashing — MD5 would be more secure" },
      { "id": "b", "text": "Unsalted hashing is vulnerable to rainbow table attacks — precomputed hash tables allow attackers to crack many passwords instantly without per-password computation. Each password hash for a common password is identical across all users using that password, enabling batch cracking. Salt (per-user random value) makes rainbow tables ineffective" },
      { "id": "c", "text": "The database was not encrypted — encryption would have prevented the rainbow table attack" },
      { "id": "d", "text": "SHA-256 is completely broken — bcrypt would also be cracked by rainbow tables" }
    ],
    "correct": "b",
    "explanations": {
      "a": "SHA-256 is stronger than MD5 — but neither is appropriate for password hashing without salting. Purpose-built password hashing functions (bcrypt, Argon2) are recommended.",
      "b": "Rainbow tables precompute hashes of common passwords — without salt, identical passwords produce identical hashes making rainbow tables effective. Salt uniquifies each hash, defeating precomputed table attacks. This is the correct answer.",
      "c": "Database encryption protects against physical access — but an attacker with database credentials can query the hashes. Rainbow tables work on the hashes themselves.",
      "d": "bcrypt includes per-user salting by design — rainbow tables are not effective against salted hashes."
    }
  },
  {
    "id": 135,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Hashing",
    "difficulty": "hard",
    "text": "Two different files produce the same MD5 hash — a known MD5 collision. What security implication does this have for systems using MD5 for file integrity verification?",
    "answers": [
      { "id": "a", "text": "A single collision makes MD5 unusable for any purpose" },
      { "id": "b", "text": "MD5 collision vulnerability means an attacker can craft a malicious file that produces the same hash as a legitimate file — if the integrity check only compares MD5 hashes, the malicious file will pass verification. Any system using MD5 for security-critical integrity verification should migrate to SHA-256 or SHA-3. MD5 is still acceptable for checksums where collision attacks are not a threat model concern" },
      { "id": "c", "text": "MD5 collisions are theoretical and have never been demonstrated in practice" },
      { "id": "d", "text": "File size differences would always distinguish the colliding files" }
    ],
    "correct": "b",
    "explanations": {
      "a": "MD5 remains useful for non-security purposes like checksums — it is unsuitable for security-critical integrity verification where collision attacks are a concern.",
      "b": "Practical MD5 collision attacks exist — chosen-prefix collision attacks allow crafting malicious files with matching hashes. Security-critical integrity checks must use collision-resistant algorithms like SHA-256. This is the correct answer.",
      "c": "MD5 collisions have been practically demonstrated — the Flame malware exploited MD5 collision attacks against Microsoft certificates.",
      "d": "Collision attacks can produce files of the same size — file size comparison does not resolve MD5 collision attacks."
    }
  },
  {
    "id": 136,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Hashing",
    "difficulty": "hard",
    "text": "A software vendor distributes software updates and publishes SHA-256 hashes on their website. An attacker compromises both the download server (replacing software with malware) and the website (updating the published hash to match the malware). How does this attack succeed despite hash verification?",
    "answers": [
      { "id": "a", "text": "This attack is impossible — hash verification always detects tampered software" },
      { "id": "b", "text": "The attack succeeds because hash verification only proves the downloaded file matches the published hash — if both the file and hash are controlled by the attacker (by compromising both sources), verification passes for the malicious file. Hash integrity is only meaningful if the hash is obtained from an independent, trusted source (e.g., signed with the vendor's private key and verified against a trusted certificate)" },
      { "id": "c", "text": "SHA-256 is weak enough that attackers can generate matching hashes for arbitrary files" },
      { "id": "d", "text": "The attacker must know the original file to compute a matching SHA-256 hash" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Hash verification fails when both the file and hash reference are compromised — the comparison is between two attacker-controlled values.",
      "b": "Hash verification provides integrity of the file relative to the published hash — if the hash publication is also compromised, the verification is meaningless. Code signing with trusted certificates (independent of the distribution channel) addresses this by enabling hash verification against a trusted, unforgeable signature. This is the correct answer.",
      "c": "SHA-256 is computationally infeasible to break — the attack works by replacing both file and hash, not by computing a collision.",
      "d": "The attacker replaced the file with malware and computed the correct SHA-256 hash of the malware — no knowledge of the original file is needed."
    }
  },
  {
    "id": 137,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Salting",
    "difficulty": "easy",
    "text": "What is salting in the context of cryptographic password storage?",
    "answers": [
      { "id": "a", "text": "Salting adds encryption to the hash process to make it reversible" },
      { "id": "b", "text": "Salting adds a random, unique value to each password before hashing — ensuring that even if two users have the same password, their stored hashes are different, and precomputed rainbow table attacks are defeated because the tables would need to include the unique salt" },
      { "id": "c", "text": "Salting applies multiple rounds of hashing to slow down brute force attacks" },
      { "id": "d", "text": "Salting encrypts the hash value after it is generated" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Salt does not make hashing reversible — it is a random value added to the input before hashing.",
      "b": "Salt uniquifies password hashes — even identical passwords produce different hashes when different random salts are applied. This defeats rainbow tables (which would need to precompute hashes for every salt value) and prevents attackers from cracking multiple identical passwords simultaneously. This is the correct answer.",
      "c": "Multiple rounds of hashing describes key stretching (work factor) — salting is about uniquification, not computational expense.",
      "d": "Salt is added to the input before hashing — it does not encrypt the hash output."
    }
  },
  {
    "id": 138,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Salting",
    "difficulty": "medium",
    "text": "A developer stores all user password hashes with the same static salt value: 'app_salt_123'. Why is a static, shared salt fundamentally less secure than per-user random salts?",
    "answers": [
      { "id": "a", "text": "A static salt is equivalent to no salt — rainbow tables can simply include the static salt in their precomputation and crack all passwords simultaneously" },
      { "id": "b", "text": "A static shared salt is significantly better than no salt, but loses two key benefits: users with the same password still have the same hash (enabling batch cracking), and an attacker who knows the static salt (through code review or database access) can build a custom rainbow table incorporating that specific salt, cracking all passwords simultaneously. Per-user random salts require per-hash brute force, eliminating batch attacks" },
      { "id": "c", "text": "Static salts are preferred — they simplify salt management without security trade-offs" },
      { "id": "d", "text": "A static salt is only a problem if it is stored in the database with the hashes" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A static salt still requires knowing the salt value to build the rainbow table — it is not equivalent to no salt, but provides much less protection than per-user salts.",
      "b": "Static salt partially defeats rainbow tables (tables must include the specific salt) but still allows batch attacks (all users with the same password have the same hash) and custom table attacks (once the static salt is known, all passwords are equally vulnerable). Per-user salts require individually attacking each hash. This is the correct answer.",
      "c": "Static salts sacrifice the per-user uniquification benefit — the security trade-off is significant.",
      "d": "The attacker learns the static salt from any source — including source code, configuration files, or leaked hash analysis."
    }
  },
  {
    "id": 139,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Salting",
    "difficulty": "hard",
    "text": "A security team inherits a password database where salts are stored alongside hashes in the same table. A junior analyst argues that storing salts in the database defeats their purpose. Is this argument valid?",
    "answers": [
      { "id": "a", "text": "Yes — salts must be kept secret to be effective" },
      { "id": "b", "text": "No — salts do not need to be secret to be effective. Their purpose is uniquification: ensuring identical passwords produce different hashes, preventing precomputed rainbow table attacks, and requiring individual per-hash brute force. Even if an attacker knows a user's salt, they must still brute force that specific hash individually. Storing salts alongside hashes is standard and correct practice" },
      { "id": "c", "text": "Yes — salts should be stored in a separate secret database inaccessible to applications" },
      { "id": "d", "text": "Salts must be stored in the hash value itself using a fixed prefix format" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Salts are not secrets — they serve a different function than secret keys.",
      "b": "Salt's security value comes from uniquification, not secrecy. Even with salt knowledge, an attacker must brute force each hash individually with that specific salt — they cannot use precomputed tables or batch-crack identical passwords. Storing salts with hashes is standard practice in all major hashing implementations. This is the correct answer.",
      "c": "Separate salt storage creates operational complexity with no security benefit — applications legitimately need the salt to verify passwords.",
      "d": "Many hashing implementations (like bcrypt) do include the salt in the stored hash string — this is correct behavior, not a security problem."
    }
  },
  {
    "id": 140,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Salting",
    "difficulty": "hard",
    "text": "An organization migrates from SHA-256 + salt to Argon2id for password hashing. During migration, existing users' passwords are rehashed when they next log in. Users who haven't logged in after 6 months still have SHA-256 hashes. What is the security risk of this hybrid state?",
    "answers": [
      { "id": "a", "text": "No risk — SHA-256 with salt is fully secure" },
      { "id": "b", "text": "SHA-256 is not a password hashing algorithm — it lacks the computational work factor needed to resist GPU-accelerated brute force. Users with SHA-256 hashes (even salted) can have their passwords cracked orders of magnitude faster than Argon2id hashes. The 6-month hybrid state means inactive users remain at greater risk. Proactive migration (forced password reset for inactive users) closes this gap" },
      { "id": "c", "text": "Argon2id is less secure than SHA-256 — the migration is making things worse" },
      { "id": "d", "text": "The hybrid state is permanent since some users will never log in" }
    ],
    "correct": "b",
    "explanations": {
      "a": "SHA-256 lacks computational work factor — modern GPUs can compute billions of SHA-256 hashes per second, making salted SHA-256 insufficient for password protection against well-resourced attackers.",
      "b": "Password hashing algorithms (bcrypt, Argon2, scrypt) are designed to be computationally expensive — resisting GPU-accelerated brute force. SHA-256 was designed to be fast, making it poor for password hashing. Users with old hashes are at greater risk. This is the correct answer.",
      "c": "Argon2id is specifically designed for password hashing and is more secure than SHA-256 for this purpose.",
      "d": "Forced password reset for long-inactive accounts resolves the hybrid state — a defined policy for inactive account remediation is appropriate."
    }
  },
  {
    "id": 141,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Digital signatures",
    "difficulty": "easy",
    "text": "When a sender digitally signs a document, which key is used to create the signature and which key verifies it?",
    "answers": [
      { "id": "a", "text": "The sender's public key creates the signature; the sender's private key verifies it" },
      { "id": "b", "text": "The sender's private key creates the signature; the sender's public key verifies it — the private key is unique to the sender, so only they can create a valid signature, while anyone with the public key can verify it" },
      { "id": "c", "text": "The recipient's public key creates the signature; the recipient's private key verifies it" },
      { "id": "d", "text": "A shared symmetric key creates and verifies the signature" }
    ],
    "correct": "b",
    "explanations": {
      "a": "This reverses the correct usage — the private key signs (proving identity), the public key verifies (anyone can check).",
      "b": "Digital signature process: sender hashes the document, encrypts the hash with their private key (signature), recipient decrypts with sender's public key and compares hashes. Private key signing proves identity; public key verification enables anyone to confirm. This is the correct answer.",
      "c": "The recipient's keys are used for encryption of messages to them — digital signatures use the sender's key pair.",
      "d": "Symmetric keys create HMACs (message authentication codes) — digital signatures use asymmetric key pairs."
    }
  },
  {
    "id": 142,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Digital signatures",
    "difficulty": "medium",
    "text": "A digital signature is verified as valid, but the document was modified after signing and re-signed by a different party. How does the verification process detect or fail to detect this?",
    "answers": [
      { "id": "a", "text": "Digital signatures are unbreakable — modifications cannot occur after signing" },
      { "id": "b", "text": "If the document was modified and re-signed by the different party, verification with that party's public key would succeed for their signature — the signature is valid but belongs to the wrong party. The recipient must verify that the signature belongs to the expected signer by checking the certificate and chain of trust, not just that a valid signature exists" },
      { "id": "c", "text": "Modifying a signed document automatically invalidates all signatures on it" },
      { "id": "d", "text": "Any valid signature is sufficient — the identity of the signer is irrelevant" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Documents can be modified and re-signed by others — digital signatures protect against undetected modification by a specific signer.",
      "b": "Signature validity depends on both the cryptographic validity AND the identity of the signer. A valid signature from an unexpected party indicates the document was tampered with and re-signed. Recipients must verify signer identity against expected parties. This is the correct answer.",
      "c": "Modifying and re-signing creates a new valid signature for the modified content — automatic invalidation only occurs if the original signature is checked against the modified content.",
      "d": "Signer identity is the primary security value of digital signatures — non-repudiation requires knowing specifically who signed."
    }
  },
  {
    "id": 143,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Digital signatures",
    "difficulty": "hard",
    "text": "A code signing certificate expires while software signed with it is already deployed. A user's system tries to verify the signature on software downloaded today. The signature was created 2 years ago when the certificate was valid. Does the signature verify successfully?",
    "answers": [
      { "id": "a", "text": "No — expired certificates always cause verification failure" },
      { "id": "b", "text": "It depends on the validation model: under shell model validation, the certificate must be valid at verification time — expired certificates fail. Under chain model (with timestamp), if the signature includes a trusted timestamp proving it was created while the certificate was valid, verification can succeed despite expiration. Windows Authenticode uses this model — software signed before expiry with a timestamp remains verifiable" },
      { "id": "c", "text": "Yes — certificate expiration never affects signature verification" },
      { "id": "d", "text": "The system should automatically renew the certificate and re-verify" }
    ],
    "correct": "b",
    "explanations": {
      "a": "With timestamps, signatures created before expiration can remain verifiable — blanket failure is not always correct.",
      "b": "Timestamp authority support is the key factor — RFC 3161 timestamps record that the signature existed when the certificate was valid, enabling post-expiration verification. This is standard practice for code signing. This is the correct answer.",
      "c": "Without timestamps, expired certificates do cause verification failure — the model matters.",
      "d": "Systems do not automatically renew signing certificates — the signer must manage certificate lifecycle."
    }
  },
  {
    "id": 144,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Digital signatures",
    "difficulty": "hard",
    "text": "A developer signs application code with a certificate issued to 'ACME Corp' but the application is actually owned by 'Contoso Ltd'. Users see 'Publisher: ACME Corp' during installation. What security risk does this create?",
    "answers": [
      { "id": "a", "text": "No risk — the code is still signed and therefore safe" },
      { "id": "b", "text": "Misleading publisher identity creates social engineering risk and breaks the trust chain — users see a different company name than expected, potentially causing them to accept or reject software incorrectly. More critically, if ACME Corp's certificate is compromised or revoked for unrelated reasons, Contoso's legitimate software loses its trusted signature. Publisher identity should match the actual software owner" },
      { "id": "c", "text": "This is acceptable practice since any valid signature provides integrity" },
      { "id": "d", "text": "The risk is only aesthetic — users rarely check publisher names" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A valid signature proves integrity and identifies the signer — but the identity must be correct for trust to be meaningful.",
      "b": "Incorrect publisher identity undermines the identity assurance value of code signing — users make trust decisions based on publisher identity. Cross-company certificate usage also creates dependency on another company's certificate management. This is the correct answer.",
      "c": "Integrity is one dimension — authenticity (verifying the correct party signed) is equally important.",
      "d": "Users and automated security systems check publisher names for trust decisions — incorrect identity has real security implications."
    }
  },
  {
    "id": 145,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Key stretching",
    "difficulty": "easy",
    "text": "What is key stretching and why is it used for password-based key derivation?",
    "answers": [
      { "id": "a", "text": "Key stretching increases the key length from 128 bits to 256 bits for stronger encryption" },
      { "id": "b", "text": "Key stretching applies a computationally expensive function to a password (or low-entropy key) many times — increasing the time required to test each password guess and making brute force attacks much slower without affecting legitimate users who enter their password once" },
      { "id": "c", "text": "Key stretching makes encryption keys longer by padding them with random bits" },
      { "id": "d", "text": "Key stretching converts symmetric keys into asymmetric key pairs" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Key stretching addresses computational cost, not key length extension.",
      "b": "Key stretching (PBKDF2, bcrypt, Argon2) applies many iterations of a hash or other computationally expensive process — making each password guess expensive. An attacker testing millions of passwords per second with GPU hardware is slowed to thousands or fewer per second. This is the correct answer.",
      "c": "Padding keys with random bits is not key stretching — stretching applies computational work to make guessing expensive.",
      "d": "Key stretching does not convert between key types — it adds computational cost to password-based key derivation."
    }
  },
  {
    "id": 146,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Key stretching",
    "difficulty": "medium",
    "text": "PBKDF2 is configured with 100,000 iterations. An attacker's GPU can compute SHA-256 at 10 billion hashes per second. With PBKDF2-SHA256 at 100,000 iterations, approximately how many password attempts can the attacker test per second?",
    "answers": [
      { "id": "a", "text": "10 billion per second — PBKDF2 does not significantly reduce cracking speed" },
      { "id": "b", "text": "Approximately 100,000 per second (10,000,000,000 / 100,000 = 100,000) — each password attempt requires 100,000 SHA-256 operations, reducing the attacker's throughput by a factor of 100,000. This makes brute force significantly slower while only minimally impacting legitimate users who verify once" },
      { "id": "c", "text": "Zero — PBKDF2 makes password cracking computationally impossible" },
      { "id": "d", "text": "1 billion per second — PBKDF2 reduces cracking speed by only 10x" }
    ],
    "correct": "b",
    "explanations": {
      "a": "PBKDF2 with 100,000 iterations reduces throughput by exactly 100,000x — the primary security mechanism.",
      "b": "10B SHA-256/second ÷ 100,000 iterations = 100,000 PBKDF2-SHA256 attempts per second. Key stretching slows brute force by the iteration count factor. This is the correct answer.",
      "c": "Key stretching makes attacks much slower, not impossible — sufficiently weak passwords can still be cracked, just more slowly.",
      "d": "100,000 iterations reduces speed by 100,000x — not 10x."
    }
  },
  {
    "id": 147,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Key stretching",
    "difficulty": "hard",
    "text": "An organization must choose between PBKDF2, bcrypt, and Argon2id for password hashing. Argon2id won the Password Hashing Competition. What specific advantage does Argon2id provide over PBKDF2 and bcrypt that makes it preferred for new implementations?",
    "answers": [
      { "id": "a", "text": "Argon2id is faster — faster hashing means better user experience" },
      { "id": "b", "text": "Argon2id supports memory-hardness parameters — requiring configurable amounts of RAM per hash computation. PBKDF2 is purely CPU-intensive (attackers can parallelize efficiently with GPUs). bcrypt has limited memory requirements. Argon2id's memory-hardness means GPU attackers need large amounts of RAM per parallel computation, significantly limiting parallelization and making GPU-accelerated attacks less effective" },
      { "id": "c", "text": "Argon2id uses longer hash outputs — larger hashes are more secure" },
      { "id": "d", "text": "Argon2id is a symmetric cipher — it provides both hashing and encryption" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Faster hashing is a disadvantage for password hashing — each password check being faster means attackers can check more passwords per second.",
      "b": "Memory-hardness is Argon2id's key advantage — GPU attacks require large RAM allocations per parallel thread, limiting the parallelization that makes GPU attacks devastating against CPU-only password hashing functions. This is the correct answer.",
      "c": "Hash output length is configurable in all three — this is not Argon2id's differentiating feature.",
      "d": "Argon2id is a key derivation function (password hashing function) — not a symmetric cipher."
    }
  },
  {
    "id": 148,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Key stretching",
    "difficulty": "hard",
    "text": "A legacy system uses 1,000 PBKDF2 iterations for password hashing (configured in 2010). Hardware performance has increased 100-fold since then. What is the security implication and recommended response?",
    "answers": [
      { "id": "a", "text": "The 1,000 iteration count remains appropriate since the algorithm is the same" },
      { "id": "b", "text": "Hardware improvement directly undermines key stretching security — what required 1 second to brute force in 2010 now takes 10 milliseconds. The iteration count should be increased to maintain equivalent brute force resistance, targeting approximately 100,000+ iterations with modern hardware. Existing hashes should be updated when users next authenticate — a migration path similar to the algorithm upgrade scenario" },
      { "id": "c", "text": "The algorithm should be replaced — iteration counts cannot be changed in deployed systems" },
      { "id": "d", "text": "Adding more characters to the salt will compensate for the reduced iteration security" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The algorithm is the same but hardware performance makes low iteration counts increasingly vulnerable — the iteration count must scale with hardware.",
      "b": "Key stretching security is directly proportional to computational cost relative to attacker hardware. Iteration counts must increase as hardware improves to maintain equivalent protection. Updating hashes on next login is the standard migration approach. This is the correct answer.",
      "c": "Iteration counts can be changed — the system stores the count alongside the hash and uses it for verification. Progressive migration on login is standard.",
      "d": "Longer salt uniquifies hashes — it does not increase the computational cost per guess. Only iteration count increases the brute force resistance."
    }
  },
  {
    "id": 149,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Blockchain",
    "difficulty": "easy",
    "text": "What security property does blockchain technology provide through its linked-block structure?",
    "answers": [
      { "id": "a", "text": "Blockchain encrypts all transactions making them confidential" },
      { "id": "b", "text": "Blockchain provides immutability and tamper evidence — each block contains a cryptographic hash of the previous block. Modifying any historical block would invalidate all subsequent blocks' hashes, making unauthorized modification immediately detectable by the network" },
      { "id": "c", "text": "Blockchain provides anonymity — transactions cannot be traced to individuals" },
      { "id": "d", "text": "Blockchain prevents all double-spending through centralized transaction validation" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Most blockchain implementations (like Bitcoin) are publicly transparent — transactions are visible. Confidentiality is not blockchain's primary security property.",
      "b": "The hash-linked chain provides integrity and tamper evidence — modifying a historical record changes its hash, which cascades through all subsequent blocks. The distributed network rejects chains that don't match the accepted ledger. This is the correct answer.",
      "c": "Most public blockchains are pseudonymous at best — transactions are publicly visible and can often be de-anonymized.",
      "d": "Decentralized consensus, not central validation, is the blockchain model for preventing double-spending."
    }
  },
  {
    "id": 150,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Blockchain",
    "difficulty": "medium",
    "text": "An organization considers using a blockchain to maintain an audit log of privileged administrator actions. What security advantage does blockchain provide over a traditional centralized audit log database?",
    "answers": [
      { "id": "a", "text": "Blockchain audit logs are faster to query than traditional databases" },
      { "id": "b", "text": "A centralized audit log can be modified by an administrator with database access — including the very administrators being audited. A blockchain distributed across multiple nodes makes modification by any single party (including privileged admins) computationally infeasible without consensus of the network, providing stronger tamper resistance for audit records" },
      { "id": "c", "text": "Blockchain logs require no storage space since they use compression" },
      { "id": "d", "text": "Blockchain provides real-time alerting when administrators take suspicious actions" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Blockchain databases are typically slower than traditional databases for queries — the advantage is tamper resistance, not performance.",
      "b": "Tamper resistance is the key advantage: a DBA or sysadmin with traditional database access can delete or modify audit records to cover tracks. Blockchain's distributed consensus makes single-party modification infeasible. This is the correct answer.",
      "c": "Blockchain does not compress data — it stores complete transaction histories which grow continuously.",
      "d": "Blockchain provides immutable records — not real-time behavioral alerting."
    }
  },
  {
    "id": 151,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Blockchain",
    "difficulty": "hard",
    "text": "A private permissioned blockchain is proposed for supply chain tracking. A security reviewer notes that a 51% attack is a concern. What is a 51% attack and how does the permissioned nature of the blockchain affect this risk?",
    "answers": [
      { "id": "a", "text": "A 51% attack is when 51 attackers simultaneously try to access the blockchain" },
      { "id": "b", "text": "A 51% attack occurs when a single entity controls more than 50% of the network's consensus power (hash power or stake), enabling them to manipulate the ledger by reversing transactions or double-spending. For a permissioned blockchain with a limited, known set of validators, a smaller group of compromised validators could achieve consensus dominance — making validator selection, geographic/organizational distribution, and governance critical security considerations" },
      { "id": "c", "text": "Private blockchains are immune to 51% attacks by definition" },
      { "id": "d", "text": "A 51% attack only affects cryptocurrency blockchains — not enterprise blockchains" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A 51% attack is about consensus power percentage — not the number of attackers.",
      "b": "Consensus majority control allows ledger manipulation. For permissioned blockchains with few validators, compromising a majority of validators is easier than on public blockchains with thousands of nodes. Validator governance and distribution are critical security controls. This is the correct answer.",
      "c": "Private/permissioned blockchains can face consensus attacks — often more easily than public blockchains due to fewer validators.",
      "d": "51% attacks affect any blockchain using majority-consensus mechanisms — not limited to cryptocurrency."
    }
  },
  {
    "id": 152,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Blockchain",
    "difficulty": "hard",
    "text": "Smart contracts on a blockchain automatically execute business logic when conditions are met. A smart contract contains a vulnerability that allows an attacker to drain funds. Once deployed to an immutable blockchain, how does this create a unique security challenge?",
    "answers": [
      { "id": "a", "text": "Blockchain smart contracts can be patched like traditional software" },
      { "id": "b", "text": "Blockchain immutability means deployed smart contract code cannot be modified after deployment — the vulnerability cannot be patched in the deployed contract. Mitigations include: deploying a proxy contract pattern that delegates to an upgradeable implementation; pausing contract functionality through a circuit breaker; deploying a new contract and migrating; or accepting the loss and compensating from reserves. This illustrates why rigorous security auditing BEFORE deployment is critical" },
      { "id": "c", "text": "The blockchain network will automatically reject transactions exploiting the vulnerability" },
      { "id": "d", "text": "The smart contract can be rolled back by the blockchain administrators" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Unlike traditional software, deployed smart contract bytecode is immutable — patching requires deploying new contracts.",
      "b": "Blockchain immutability creates unique challenges for security remediation — the deployed vulnerable code cannot be modified. Pre-deployment auditing is critical; post-deployment options are limited and complex. This is the correct answer.",
      "c": "Blockchains execute valid transactions — they do not semantically validate smart contract logic for correctness.",
      "d": "Blockchain design explicitly prevents administrative rollback — immutability is a core feature, not a bug to be overridden."
    }
  },
  {
    "id": 153,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Certificate Authorities",
    "difficulty": "easy",
    "text": "What is the role of a Certificate Authority (CA) in a PKI?",
    "answers": [
      { "id": "a", "text": "A CA generates encryption keys for all users in an organization" },
      { "id": "b", "text": "A CA is a trusted entity that issues, signs, and manages digital certificates — binding public keys to verified identities. By signing a certificate with its private key, the CA vouches that the certificate holder is who they claim to be, allowing relying parties who trust the CA to trust the certificate" },
      { "id": "c", "text": "A CA encrypts communications between users and servers" },
      { "id": "d", "text": "A CA is a backup system for storing private keys" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Users generate their own key pairs and submit the public key to the CA for certification — the CA does not generate user keys.",
      "b": "The CA is the trust anchor — it verifies identities and binds verified identities to public keys through signed certificates. Trust in the CA extends trust to all certificates it issues. This is the correct answer.",
      "c": "Communications encryption uses the certificates issued by the CA — the CA itself does not perform the encryption.",
      "d": "Key escrow (private key backup) is a separate function — CAs issue and sign certificates, not store private keys."
    }
  },
  {
    "id": 154,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Certificate Authorities",
    "difficulty": "medium",
    "text": "A website uses a certificate issued by a CA that is trusted by all major browsers. The CA's root certificate is removed from all browsers' trusted root stores due to policy violations. What happens to all websites using certificates from this CA?",
    "answers": [
      { "id": "a", "text": "The websites continue to work normally — individual certificates are not affected by CA trust changes" },
      { "id": "b", "text": "Browsers will display certificate error warnings for all sites using certificates issued by the untrusted CA — the entire trust chain fails because the CA's root certificate is no longer trusted. All affected websites must obtain new certificates from a trusted CA to restore secure operation" },
      { "id": "c", "text": "Only expired certificates from the removed CA are affected" },
      { "id": "d", "text": "The websites can continue using their certificates if they add the CA's root to their server configuration" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Individual certificates are trusted only because their issuing CA is trusted — removing CA trust invalidates all issued certificates.",
      "b": "Trust in certificates derives from trust in the issuing CA. Removing a root CA from the trust store causes all certificates in its chain to fail validation — browsers display error warnings and secure connections fail. This is the correct answer.",
      "c": "Certificate expiry and CA trust removal are independent events — CA distrust affects all certificates from that CA regardless of expiry.",
      "d": "Server-side configuration cannot override browser trust stores — CA trust decisions are controlled by browser and OS vendors."
    }
  },
  {
    "id": 155,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Certificate Authorities",
    "difficulty": "hard",
    "text": "A certificate transparency (CT) log reveals that a CA issued a certificate for 'google.com' to an organization that does not own google.com. This is discovered within hours. What process allows this rapid detection and what action follows?",
    "answers": [
      { "id": "a", "text": "Only Google's security team can detect fraudulent certificates for google.com" },
      { "id": "b", "text": "Certificate Transparency logs are public, append-only logs of all issued certificates — domain owners and monitoring services actively watch CT logs for unauthorized certificate issuance for their domains. Once detected, the fraudulent certificate is revoked by the CA, the CA may face audit and potential trust removal, and the incident is investigated to understand how the mis-issuance occurred (compromised RA, social engineering, etc.)" },
      { "id": "c", "text": "Certificate Transparency logs are only checked during TLS handshakes — not monitored continuously" },
      { "id": "d", "text": "A fraudulent certificate for google.com would not function because browsers require additional authentication" }
    ],
    "correct": "b",
    "explanations": {
      "a": "CT monitoring can be performed by anyone — many security services and the affected domain owners monitor CT logs.",
      "b": "CT logs enable rapid detection of mis-issued certificates — the response involves revocation, CA audit, and investigation. This illustrates CT's value as a detection mechanism for CA mis-issuance. This is the correct answer.",
      "c": "CT logs are monitored continuously by domain owners and monitoring services — not just during handshakes.",
      "d": "Fraudulent certificates from trusted CAs would function in browsers — which is precisely why CT monitoring and rapid revocation are critical."
    }
  },
  {
    "id": 156,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Certificate Authorities",
    "difficulty": "hard",
    "text": "An internal enterprise CA issues certificates for all internal services. An administrator accidentally generates the CA private key with only 1024-bit RSA. The CA has issued 500 certificates. What is the security risk and remediation?",
    "answers": [
      { "id": "a", "text": "1024-bit RSA is still secure — no remediation is needed" },
      { "id": "b", "text": "RSA-1024 is considered computationally feasible to factor with modern hardware and is prohibited by NIST for use after 2013. The CA's weak key means all 500 issued certificates inherit this weakness. Remediation requires: generating a new CA key pair with minimum RSA-2048 (or ECC P-256 equivalent); re-issuing all 500 certificates from the new CA; distributing the new CA certificate to all trusting clients; and revoking/destroying the old 1024-bit CA key" },
      { "id": "c", "text": "Only new certificates issued after the discovery need to be replaced" },
      { "id": "d", "text": "The key length can be extended without regenerating the CA" }
    ],
    "correct": "b",
    "explanations": {
      "a": "RSA-1024 is deprecated and considered breakable — NIST deprecated it before 2014.",
      "b": "A weak CA key compromises all certificates it issues — the complete remediation requires replacing the CA key, re-issuing all certificates, and updating client trust stores. This is operationally significant but necessary. This is the correct answer.",
      "c": "All 500 existing certificates are at risk because they chain to the weak CA — replacement of only future certificates is insufficient.",
      "d": "RSA key length is part of the key's mathematical structure — it cannot be extended after generation."
    }
  },
  {
    "id": 157,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "CRL/OCSP",
    "difficulty": "easy",
    "text": "What is the PRIMARY purpose of a Certificate Revocation List (CRL)?",
    "answers": [
      { "id": "a", "text": "A CRL lists all certificates that will expire within the next 30 days" },
      { "id": "b", "text": "A CRL is a list published by a CA containing serial numbers of certificates that have been revoked before their natural expiration — enabling relying parties to check whether a certificate they are trusting has been invalidated" },
      { "id": "c", "text": "A CRL lists all active, valid certificates issued by the CA" },
      { "id": "d", "text": "A CRL is used to renew certificates that are approaching expiration" }
    ],
    "correct": "b",
    "explanations": {
      "a": "CRLs list revoked certificates — not certificates approaching expiration.",
      "b": "CRLs provide revocation information — when a private key is compromised, a certificate is mis-issued, or a business relationship ends, the CA revokes the certificate and adds it to the CRL. Relying parties should check the CRL before trusting a certificate. This is the correct answer.",
      "c": "CRLs list revoked certificates — the inverse of active valid certificates.",
      "d": "Certificate renewal is a separate process — CRLs document revocation, not renewal."
    }
  },
  {
    "id": 158,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "CRL/OCSP",
    "difficulty": "medium",
    "text": "OCSP (Online Certificate Status Protocol) was developed as an alternative to CRLs. What specific limitation of CRLs does OCSP address?",
    "answers": [
      { "id": "a", "text": "OCSP provides faster certificate issuance than CRL-based systems" },
      { "id": "b", "text": "CRLs grow very large over time and require downloading the entire list to check one certificate's status. OCSP allows real-time status queries for a single specific certificate without downloading the full list — reducing bandwidth and providing more current revocation status than a periodically published CRL" },
      { "id": "c", "text": "OCSP enables certificates to be automatically renewed when they expire" },
      { "id": "d", "text": "OCSP encrypts certificate status responses while CRLs are transmitted in plaintext" }
    ],
    "correct": "b",
    "explanations": {
      "a": "OCSP addresses revocation checking — not certificate issuance.",
      "b": "CRL scalability is the problem OCSP solves: large CRLs consume bandwidth and become outdated between publications. OCSP queries a responder for a single certificate's current status in real time. This is the correct answer.",
      "c": "Certificate renewal is outside OCSP's scope — OCSP only addresses revocation status checking.",
      "d": "CRL distribution points can use HTTPS — OCSP signatures on responses provide integrity, but encryption is not the primary differentiator."
    }
  },
  {
    "id": 159,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "CRL/OCSP",
    "difficulty": "hard",
    "text": "A web server's certificate is revoked after its private key is compromised. However, the OCSP responder experiences downtime for 4 hours. During this time, browsers use 'soft fail' behavior. What security risk does soft fail OCSP create?",
    "answers": [
      { "id": "a", "text": "Soft fail OCSP prevents all connections during OCSP downtime — providing maximum security" },
      { "id": "b", "text": "Soft fail means browsers accept the connection when OCSP is unavailable — treating 'cannot check revocation' as 'revocation status unknown, proceed anyway.' This allows connections to succeed with the compromised certificate during the OCSP downtime. Attackers can perform OCSP stapling attacks or block OCSP responses to keep revoked certificates appearing valid" },
      { "id": "c", "text": "Soft fail is always more secure than hard fail for certificate revocation" },
      { "id": "d", "text": "OCSP downtime has no security impact since certificates remain valid until expiration" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Soft fail is the opposite — it proceeds when OCSP is unavailable. Hard fail blocks connections when revocation status cannot be confirmed.",
      "b": "Soft fail OCSP creates a revocation bypass attack surface — by blocking OCSP responses, attackers can prevent revocation from being checked, allowing compromised certificates to appear valid. OCSP stapling (where servers include OCSP responses in TLS handshakes) is the preferred mitigation. This is the correct answer.",
      "c": "Hard fail (reject when OCSP unavailable) is more secure for revocation checking — soft fail trades availability for security.",
      "d": "Revocation specifically addresses compromised keys that need invalidation before natural expiry — OCSP downtime is security-relevant."
    }
  },
  {
    "id": 160,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "CRL/OCSP",
    "difficulty": "hard",
    "text": "An organization's internal CA does not publish a CRL or operate an OCSP responder. An employee is terminated and their client certificate must be revoked. What security problem does the absence of revocation infrastructure create?",
    "answers": [
      { "id": "a", "text": "Certificate revocation is optional — certificates automatically become invalid when the holder leaves the organization" },
      { "id": "b", "text": "Without CRL or OCSP, there is no mechanism to communicate revocation — the terminated employee's certificate remains technically valid to relying parties until it expires. If the certificate is used for client authentication, VPN access, or email signing, it continues to work even after termination. Services that rely on the certificate cannot distinguish it from valid certificates without a revocation check mechanism" },
      { "id": "c", "text": "The CA should delete the certificate from its database — this revokes it without CRL/OCSP" },
      { "id": "d", "text": "Active Directory can automatically invalidate certificates without CRL infrastructure" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Certificates have explicit expiration dates — they do not auto-invalidate when the holder's employment changes.",
      "b": "Without revocation infrastructure, compromised or invalid certificates remain usable — the employee could continue authenticating to systems using the certificate until it expires. This is a critical security gap. This is the correct answer.",
      "c": "Deleting a certificate from the CA database does not revoke it — relying parties have no mechanism to learn of the deletion.",
      "d": "Active Directory can revoke smart card certificates through specific mechanisms — but this requires PKI integration and proper configuration, not an automatic process without CRL/OCSP."
    }
  },
  {
    "id": 161,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Certificate Types",
    "difficulty": "easy",
    "text": "What is the difference between a self-signed certificate and a certificate issued by a trusted third-party CA?",
    "answers": [
      { "id": "a", "text": "Self-signed certificates use weaker encryption than CA-issued certificates" },
      { "id": "b", "text": "A self-signed certificate is signed by the entity that owns it — there is no third-party verification of the holder's identity. Third-party CA certificates are signed by a trusted CA that has verified the holder's identity. Browsers and clients trust third-party CA certificates automatically; self-signed certificates generate untrusted warnings unless manually added to trusted stores" },
      { "id": "c", "text": "Self-signed certificates expire more quickly than CA-issued certificates" },
      { "id": "d", "text": "Third-party CA certificates are always free while self-signed certificates cost money" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Both types can use the same cryptographic algorithms — the difference is in the trust chain, not encryption strength.",
      "b": "The fundamental difference is trust establishment: self-signed certificates have no third-party verification, while CA-issued certificates rely on the CA's vetting and trust position. This is the correct answer.",
      "c": "Certificate validity periods are configurable — self-signed certificates can have any validity period.",
      "d": "Trusted CA certificates typically cost money; self-signed are free to generate (though Let's Encrypt offers free trusted certificates)."
    }
  },
  {
    "id": 162,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Certificate Types",
    "difficulty": "medium",
    "text": "A wildcard certificate is issued for *.example.com. Which domains does this certificate cover and which does it NOT cover?",
    "answers": [
      { "id": "a", "text": "It covers example.com and all subdomains at any depth" },
      { "id": "b", "text": "A wildcard certificate covers all single-level subdomains of example.com (mail.example.com, www.example.com, api.example.com) but does NOT cover the apex domain example.com itself (in most implementations) or multi-level subdomains (dev.api.example.com)" },
      { "id": "c", "text": "Wildcard certificates cover all domains in the .com TLD" },
      { "id": "d", "text": "Wildcards cover only web (HTTP/HTTPS) traffic — not email or other services" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Wildcards are single-level — they do not cover multiple levels of subdomains.",
      "b": "*.example.com matches exactly one additional label: mail.example.com, www.example.com, etc. It does not match example.com (apex) or deep subdomains like a.b.example.com. This is the correct answer.",
      "c": "Wildcards are domain-specific — *.example.com has no authority over other .com domains.",
      "d": "Certificate applicability is based on domain names — wildcard certificates apply to the specified domain regardless of the service (HTTP, SMTP, etc.)."
    }
  },
  {
    "id": 163,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Certificate Types",
    "difficulty": "hard",
    "text": "An organization uses a wildcard certificate for *.example.com across 15 different web servers. The wildcard private key is compromised on one server. What is the security impact and what practice would have reduced the blast radius?",
    "answers": [
      { "id": "a", "text": "Only the compromised server is affected — other servers' certificates are unrelated" },
      { "id": "b", "text": "All 15 servers use the same wildcard certificate and private key — compromise of the key on one server exposes all subdomains covered by the wildcard. Any attacker with the key can impersonate any *.example.com subdomain. The wildcard must be revoked and replaced across all 15 servers. Using per-service individual certificates (Subject Alternative Names or individual certs) would limit exposure to the single compromised service" },
      { "id": "c", "text": "Wildcard certificates cannot be compromised because they cover multiple domains" },
      { "id": "d", "text": "The compromised server's certificate can be individually revoked without affecting others" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A wildcard certificate and private key are shared — compromise of the key on any server compromises the entire wildcard.",
      "b": "Shared wildcard keys create single-point-of-failure for all covered subdomains. Per-service certificates limit compromise to one service. This is the correct answer.",
      "c": "Wildcard certificates are as vulnerable to key compromise as any certificate — the scope of impact is larger due to the wildcard coverage.",
      "d": "There is only one wildcard certificate — it cannot be revoked for only one server while keeping it valid for others."
    }
  },
  {
    "id": 164,
    "domain": "1.0",
    "objective": "1.4",
    "keyword": "Certificate Types",
    "difficulty": "hard",
    "text": "A developer generates a Certificate Signing Request (CSR) for a new web server certificate. The CSR is submitted to a public CA. What information from the CSR does the CA use, and what information does the CA add when issuing the certificate?",
    "answers": [
      { "id": "a", "text": "The CA replaces all CSR information with its own data" },
      { "id": "b", "text": "From the CSR, the CA uses: the public key (to embed in the certificate), the Subject Distinguished Name (organization, domain, etc.), and the Subject Alternative Names. The CA adds: its own issuer identity, a unique serial number, the validity period (not before/not after), the CA's digital signature over the certificate contents, and any extensions/policies. The private key never appears in the CSR or certificate — it stays with the requester" },
      { "id": "c", "text": "The CA only adds its digital signature — all other information comes from the CSR exactly as submitted" },
      { "id": "d", "text": "The CSR contains the private key which the CA uses to sign the certificate" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The CA incorporates and validates CSR information — it does not discard it entirely.",
      "b": "The certificate is a collaboration: CSR provides identity claims and the public key; the CA verifies identity, sets validity, adds policy extensions, and signs the whole thing. Private keys never leave the requester. This is the correct answer.",
      "c": "The CA adds significant information beyond the signature — including issuer identity, serial number, validity period, and extensions.",
      "d": "Private keys must never appear in CSRs or certificates — the CSR contains only the public key. Exposing the private key would invalidate the entire purpose of the PKI."
    }
  },
  {
    "id": 165,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Nation-state",
    "difficulty": "easy",
    "text": "Which of the following BEST characterizes a nation-state threat actor?",
    "answers": [
      { "id": "a", "text": "A lone hacker motivated by personal financial gain" },
      { "id": "b", "text": "A government-sponsored group with significant resources, advanced capabilities, and long-term strategic objectives — conducting espionage, sabotage, or influence operations on behalf of a country" },
      { "id": "c", "text": "A hacktivist group protesting corporate environmental practices" },
      { "id": "d", "text": "An organized crime syndicate conducting ransomware attacks for profit" }
    ],
    "correct": "b",
    "explanations": {
      "a": "A lone financially motivated hacker is an individual criminal actor — not a nation-state.",
      "b": "Nation-state actors are government-affiliated groups with substantial resources, advanced persistent threat (APT) capabilities, and geopolitical objectives. They are among the most sophisticated and well-funded threat actors. This is the correct answer.",
      "c": "Hacktivists are ideologically motivated — not government-sponsored with national strategic objectives.",
      "d": "Organized crime prioritizes financial gain — not national strategic objectives like espionage or infrastructure sabotage."
    }
  },
  {
    "id": 166,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Nation-state",
    "difficulty": "medium",
    "text": "A critical infrastructure company discovers attackers have been inside their network for 18 months, silently mapping SCADA systems without causing disruption. Which threat actor type does this behavior MOST likely indicate?",
    "answers": [
      { "id": "a", "text": "Unskilled attacker — they could not find the data they were looking for" },
      { "id": "b", "text": "Nation-state actor — the 18-month dwell time, focus on critical infrastructure mapping, and non-destructive patience are hallmarks of a nation-state advanced persistent threat (APT) pre-positioning for potential future disruption" },
      { "id": "c", "text": "Organized crime — they are preparing a ransomware deployment" },
      { "id": "d", "text": "Hacktivist — they are documenting the company's environmental violations" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Unskilled attackers typically cause quick, detectable damage — 18 months of stealthy persistence requires significant capability.",
      "b": "Long-term stealthy access to critical infrastructure with mapping but no immediate destruction is a nation-state APT signature — pre-positioning for potential future use in geopolitical conflict. This is the correct answer.",
      "c": "Organized crime typically moves faster to monetize access — 18 months of non-monetizing persistence is inconsistent with financial motivation.",
      "d": "Hacktivists typically want their actions known — publishing evidence, not quietly mapping SCADA systems."
    }
  },
  {
    "id": 167,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Nation-state",
    "difficulty": "hard",
    "text": "A nation-state conducts a supply chain attack, compromising a software vendor's build process to distribute malware to thousands of organizations simultaneously. Which aspects of this attack reflect nation-state capabilities specifically?",
    "answers": [
      { "id": "a", "text": "The use of malware — any threat actor can use malware" },
      { "id": "b", "text": "The combination of: sophisticated capability to compromise a well-secured software vendor; patience and resources to develop and maintain the operation over months; intelligence to select a high-value supply chain target affecting thousands of victims simultaneously; and strategic intent to access specific high-value targets among the thousands affected — these multi-dimensional requirements distinguish nation-state operations" },
      { "id": "c", "text": "The fact that many organizations were affected — scale alone indicates nation-state involvement" },
      { "id": "d", "text": "The use of a software vendor as the attack vector — only nation-states use supply chain attacks" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Malware use is common across all threat actor types — it is not a nation-state differentiator.",
      "b": "Nation-state supply chain attacks require the combination of sophisticated vendor compromise capability, operational patience, intelligence-driven target selection, and strategic purpose beyond financial gain — these requirements together distinguish nation-state actors. This is the correct answer.",
      "c": "Scale alone does not indicate nation-state — criminal botnets also affect millions. The sophistication and strategic intent are the distinguishing factors.",
      "d": "Supply chain attacks are used by various threat actors including criminal groups — not exclusively nation-states."
    }
  },
  {
    "id": 168,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Nation-state",
    "difficulty": "hard",
    "text": "A security team discovers what appears to be a nation-state APT in their network. The attacker has not yet achieved their apparent objective. The team debates whether to immediately eject the attacker or monitor for intelligence value. What are the key considerations in this decision?",
    "answers": [
      { "id": "a", "text": "Always immediately eject all attackers — monitoring provides no benefit" },
      { "id": "b", "text": "Monitoring considerations: intelligence value (understanding objectives, TTPs, and targets helps defenders and intelligence agencies), risk of further damage during monitoring period, legal and notification obligations, and whether the attacker will detect monitoring and escalate. Ejection considerations: immediate risk reduction, compliance requirements, liability during monitoring, and the difficulty of ensuring complete eradication. Legal counsel and law enforcement should be consulted — the decision involves significant legal, ethical, and operational trade-offs" },
      { "id": "c", "text": "Always monitor indefinitely — intelligence gathering always outweighs risks" },
      { "id": "d", "text": "The decision belongs entirely to the IT security team without legal or executive involvement" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Immediate ejection is often correct but the decision involves significant trade-offs that require analysis, not a blanket rule.",
      "b": "Nation-state APT monitoring vs. ejection involves complex legal, operational, and strategic considerations requiring multi-stakeholder input. Both approaches have legitimate justifications depending on context. This is the correct answer.",
      "c": "Indefinite monitoring creates ongoing liability and risk — the decision must balance intelligence value against exposure.",
      "d": "Nation-state APT response requires legal counsel, executive leadership, and often law enforcement — it exceeds IT security team authority."
    }
  },
  {
    "id": 169,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Unskilled attacker",
    "difficulty": "easy",
    "text": "What term describes an attacker who uses pre-built tools and exploits created by others without understanding the underlying techniques?",
    "answers": [
      { "id": "a", "text": "Nation-state actor" },
      { "id": "b", "text": "Script kiddie (unskilled attacker) — an individual who uses pre-written exploits, hacking tools, and scripts without the technical knowledge to develop their own, typically seeking notoriety or entertainment rather than strategic objectives" },
      { "id": "c", "text": "Hacktivist" },
      { "id": "d", "text": "Insider threat" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Nation-state actors have significant technical expertise and custom-developed tools — the opposite of an unskilled attacker.",
      "b": "Script kiddies (unskilled attackers) rely on others' tools without understanding them — they are opportunistic, cause real damage, but lack the sophistication to develop novel attacks. This is the correct answer.",
      "c": "Hacktivists may use various skill levels — they are defined by ideological motivation, not skill level.",
      "d": "Insider threats leverage legitimate access — they are defined by their position, not skill level."
    }
  },
  {
    "id": 170,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Unskilled attacker",
    "difficulty": "medium",
    "text": "An unskilled attacker downloads a popular exploit kit and uses it to attack random internet-accessible servers. Despite low sophistication, why are unskilled attackers still a significant threat to organizations?",
    "answers": [
      { "id": "a", "text": "Unskilled attackers are not a significant threat — only sophisticated actors cause real damage" },
      { "id": "b", "text": "Unskilled attackers are significant because: exploit kits are highly capable (created by skilled developers); they attack at massive scale (opportunistic, automated scanning); they successfully compromise unpatched systems regardless of attacker sophistication; they may inadvertently cause significant damage; and their volume means any organization with common vulnerabilities will eventually be targeted" },
      { "id": "c", "text": "Unskilled attackers target only home users — not organizations" },
      { "id": "d", "text": "Unskilled attackers only pose reputational risk — they cannot cause operational damage" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Unskilled attackers cause significant real-world damage — many major breaches result from exploitation of known vulnerabilities by automated tools requiring minimal skill.",
      "b": "The democratization of attack tools means unskilled attackers wield sophisticated capabilities — volume and opportunistic targeting ensure that vulnerable organizations will be hit regardless of attacker skill. This is the correct answer.",
      "c": "Exploit kits scan the internet indiscriminately — organizations with internet-exposed services are regular targets.",
      "d": "Ransomware deployed by unskilled attackers using exploit kits causes significant operational and financial damage — not just reputational."
    }
  },
  {
    "id": 171,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Unskilled attacker",
    "difficulty": "hard",
    "text": "A security analyst notices that identical exploitation attempts against their organization match public proof-of-concept code released 3 days ago for a newly disclosed vulnerability. The attack is unsuccessful because the patch was applied 24 hours ago. What does this scenario illustrate about unskilled attacker behavior?",
    "answers": [
      { "id": "a", "text": "The attack proves the attacker is a nation-state actor — they move very quickly after disclosure" },
      { "id": "b", "text": "Unskilled attackers rapidly weaponize public exploits shortly after disclosure — the short window between disclosure and attack attempts demonstrates that patch deployment speed is critical. Organizations that patch quickly (as this one did) successfully defend against this common threat pattern. The matching of public PoC code confirms the attacker used existing tools rather than developed novel capability" },
      { "id": "c", "text": "The patch was unnecessary — the attack failed for other reasons" },
      { "id": "d", "text": "Unskilled attackers never succeed because they only use public tools" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Nation-state actors typically have zero-day capabilities and do not need to wait for public PoC code.",
      "b": "Unskilled attackers using public PoC code immediately after disclosure is a well-documented pattern — the organization's quick patching was effective precisely because unskilled attackers rely on known exploits. This is the correct answer.",
      "c": "The patch was the direct defense that worked — timing the patch before the exploitation attempt was the decisive factor.",
      "d": "Unskilled attackers using public tools succeed regularly against unpatched systems — public tools are often highly effective."
    }
  },
  {
    "id": 172,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Unskilled attacker",
    "difficulty": "hard",
    "text": "An unskilled attacker accidentally installs a destructive wiper on a target system while attempting to deploy ransomware — confusing the tools in their exploit kit. The wiper destroys all data on the system. What does this scenario illustrate about unskilled attackers?",
    "answers": [
      { "id": "a", "text": "Unskilled attackers are harmless because they make mistakes" },
      { "id": "b", "text": "Unskilled attackers can cause severe unintended damage precisely because they do not understand the tools they use — a mistake deploying the wrong tool causes irreversible data destruction. The lack of understanding that defines an unskilled attacker does not limit the damage potential; it makes outcomes less predictable and potentially worse. Organizations face real risk from both intentional and accidental damage" },
      { "id": "c", "text": "The attacker intentionally used the wiper — all attackers know their tools" },
      { "id": "d", "text": "The damage is minimal because the attacker was not skilled enough to exfiltrate data first" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Mistakes by unskilled attackers often cause more damage than intentional actions — accidental destruction is still destruction.",
      "b": "Unskilled attackers operating powerful tools without understanding creates unpredictable, potentially worse outcomes than skilled actors who control their operations precisely. This is the correct answer.",
      "c": "By definition, unskilled attackers do not fully understand their tools — assuming knowledge contradicts the threat actor classification.",
      "d": "Data destruction without exfiltration is still significant operational and financial damage — the absence of exfiltration does not minimize the impact."
    }
  },
  {
    "id": 173,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Hacktivist",
    "difficulty": "easy",
    "text": "Which of the following BEST describes a hacktivist threat actor?",
    "answers": [
      { "id": "a", "text": "A government-sponsored attacker conducting espionage operations" },
      { "id": "b", "text": "An individual or group that uses hacking techniques to advance political, social, or ideological causes — typically targeting organizations whose activities conflict with their beliefs, seeking to embarrass, disrupt, or publicize their grievances" },
      { "id": "c", "text": "A criminal organization monetizing cyberattacks through ransomware and fraud" },
      { "id": "d", "text": "An employee who leaks confidential data out of revenge" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Government-sponsored attackers are nation-state actors — hacktivists are ideologically motivated individuals or loosely organized groups.",
      "b": "Hacktivism combines hacking with activism — the primary motivation is advancing a cause, not financial gain. Anonymous and similar groups are classic examples. This is the correct answer.",
      "c": "Criminal organizations are motivated by financial gain — hacktivists are motivated by ideology.",
      "d": "A revenge-motivated employee is an insider threat — hacktivists are externally targeting organizations for ideological reasons."
    }
  },
  {
    "id": 174,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Hacktivist",
    "difficulty": "medium",
    "text": "A hacktivist group defaces a pharmaceutical company's website with messaging criticizing drug pricing and leaks internal emails discussing pricing strategies. Which combination of attack types did they use and what were their apparent objectives?",
    "answers": [
      { "id": "a", "text": "They used ransomware for financial gain" },
      { "id": "b", "text": "They used web defacement (to publicly broadcast their message) and data exfiltration with public leaking (to embarrass the company and provide evidence for their cause). Their objectives were publicity, reputational damage to the target, and advancing their cause — not financial gain. The combination is characteristic of hacktivist operations" },
      { "id": "c", "text": "They conducted a DDoS attack to disrupt operations for profit" },
      { "id": "d", "text": "They performed reconnaissance to sell the data to competitors" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Ransomware is financially motivated — the described actions (defacement, public leaking) serve ideological messaging goals.",
      "b": "Hacktivist operations typically combine techniques to maximize publicity and embarrassment — defacement broadcasts the message, leaking provides supporting evidence, and both achieve reputational damage to advance their cause. This is the correct answer.",
      "c": "DDoS for profit is a criminal extortion tactic — hacktivist DDoS is ideologically motivated disruption, not profit-seeking.",
      "d": "Selling data to competitors is financially motivated industrial espionage — hacktivists publish data publicly for cause advancement."
    }
  },
  {
    "id": 175,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Hacktivist",
    "difficulty": "hard",
    "text": "A company is considering a controversial policy change that may attract hacktivist attention. How should the threat intelligence team assess hacktivist risk and what defensive measures are MOST appropriate?",
    "answers": [
      { "id": "a", "text": "Hacktivist threats cannot be predicted or defended against" },
      { "id": "b", "text": "Threat assessment: monitor hacktivist forums and social media for discussion of the company as a target; assess which groups are active in the relevant cause area and their historical TTPs (DDoS, defacement, doxing, leaking). Defensive measures: DDoS mitigation services (hacktivists frequently use DDoS); web application hardening against defacement; data loss prevention (counter leaking); employee awareness of social engineering; public communications strategy to manage reputational risk from any successful attacks" },
      { "id": "c", "text": "The only defense is reversing the controversial policy immediately" },
      { "id": "d", "text": "Hacktivist groups only target government entities — corporations are not at risk" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Hacktivist threats can be assessed and defended against — their public nature (announcing targets, discussing plans openly) makes them more predictable than nation-state actors.",
      "b": "Hacktivist defense combines threat intelligence (they often announce targets) with technical controls (DDoS, WAF, DLP) and communication strategy. This is the correct answer.",
      "c": "Policy changes may be appropriate but security should not be held hostage to activist threats — defensive measures allow maintaining business decisions while managing risk.",
      "d": "Hacktivists target corporations regularly — pharmaceutical companies, financial institutions, and oil companies are frequent targets."
    }
  },
  {
    "id": 176,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Hacktivist",
    "difficulty": "hard",
    "text": "A hacktivist group claims to have obtained a company's customer database and threatens to publish it unless the company publicly apologizes for a controversial action. How does this scenario blur the line between hacktivism and cybercrime?",
    "answers": [
      { "id": "a", "text": "This is clearly only hacktivism — the demand for a public apology is ideological" },
      { "id": "b", "text": "Data theft with a conditional threat to publish constitutes extortion regardless of the ideological framing. When hacktivists use data as leverage with conditional demands, they cross into criminal extortion territory. The ideological motivation does not legally or ethically justify the criminal conduct. This blurring of motivation and method complicates threat classification and law enforcement response" },
      { "id": "c", "text": "This is clearly only cybercrime — ideological motivation cannot coexist with criminal extortion" },
      { "id": "d", "text": "The scenario is purely hypothetical — hacktivists never make conditional demands" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Extortion (threaten to publish unless demands met) is a criminal act regardless of whether the demand is monetary or a public apology.",
      "b": "Threat actor motivations and criminal conduct are separate dimensions — hacktivism and criminal extortion can coexist when ideologically motivated actors use criminal methods. This creates classification challenges and legal complications. This is the correct answer.",
      "c": "Ideological motivation absolutely coexists with criminal conduct — political terrorists are another example.",
      "d": "Hacktivist groups making conditional demands (monetary and non-monetary) is well-documented in real incidents."
    }
  },
  {
    "id": 177,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Insider threat",
    "difficulty": "easy",
    "text": "Which of the following BEST describes an insider threat?",
    "answers": [
      { "id": "a", "text": "An attacker who breaks into an office building to steal hardware" },
      { "id": "b", "text": "A current or former employee, contractor, or business partner who uses their authorized access to harm the organization — through intentional malicious action, unintentional negligence, or being compromised by an external actor" },
      { "id": "c", "text": "A nation-state actor who uses stolen credentials to access corporate systems" },
      { "id": "d", "text": "A hacktivist group that infiltrates a company's network from the internet" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Physical break-in is an external physical threat — insider threats involve authorized access being misused.",
      "b": "Insider threats are distinguished by their legitimate access — they can be malicious (intentional harm), negligent (accidental harm), or compromised (external actor using insider's access). This is the correct answer.",
      "c": "Using stolen credentials from outside is an external threat using compromised credentials — an insider threat involves people with legitimate organizational access.",
      "d": "Hacktivists attacking from the internet are external threats — insider threats have authorized internal access."
    }
  },
  {
    "id": 178,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Insider threat",
    "difficulty": "medium",
    "text": "A disgruntled employee about to be terminated downloads 50,000 customer records and emails them to a competitor. Which controls would MOST effectively detect and prevent this insider threat?",
    "answers": [
      { "id": "a", "text": "A perimeter firewall blocking external access" },
      { "id": "b", "text": "Data Loss Prevention (DLP) detecting and blocking mass data exfiltration via email; User and Entity Behavior Analytics (UEBA) alerting on unusual bulk download behavior; access controls limiting which employees can access all 50,000 records (least privilege); pre-termination access review and timely revocation; and monitoring for anomalous user activity" },
      { "id": "c", "text": "Antivirus software on the employee's workstation" },
      { "id": "d", "text": "Network IDS signatures for external attacker TTPs" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Perimeter firewalls protect against external threats — they do not prevent authorized users from emailing data outward.",
      "b": "Insider threat controls must address authorized users misusing legitimate access: DLP prevents exfiltration, UEBA detects behavioral anomalies, least privilege limits data accessible per person, and timely access revocation closes the window before termination. This is the correct answer.",
      "c": "Antivirus targets malware — it does not detect or prevent authorized data theft.",
      "d": "IDS signatures for external attacker TTPs are not designed to detect insider misuse of legitimate access."
    }
  },
  {
    "id": 179,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Insider threat",
    "difficulty": "hard",
    "text": "A financial analyst with legitimate access to trading systems places unauthorized trades that benefit an external party. Investigations reveal the analyst was recruited by an outside criminal organization. How does this complicate insider threat classification?",
    "answers": [
      { "id": "a", "text": "This is clearly only an external threat since an outside organization is involved" },
      { "id": "b", "text": "This represents a hybrid insider-external threat: the insider provides the access and execution capability, while the external organization provides the direction and motivation. The controls for pure insider threats (behavioral monitoring, access controls) must be complemented with controls for external recruitment and manipulation: counterintelligence awareness, financial disclosure requirements, separation of duties, and monitoring for collusion indicators" },
      { "id": "c", "text": "This is clearly only an insider threat since the analyst performed the actions" },
      { "id": "d", "text": "External recruitment of insiders is too rare to warrant specific controls" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The insider performed the actions using legitimate access — insider threat controls are essential even though external direction is involved.",
      "b": "Externally recruited insider threats combine characteristics of both insider (access, execution) and external threats (direction, motivation). Controls must address both dimensions. This is the correct answer.",
      "c": "The external criminal organization's involvement means external threat actor controls (counterintelligence, external relationship monitoring) are also relevant.",
      "d": "Externally recruited insiders are a well-documented threat — nation-state actors and organized crime both recruit organizational insiders."
    }
  },
  {
    "id": 180,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Insider threat",
    "difficulty": "hard",
    "text": "A security team discovers that a system administrator has been creating backdoor accounts on critical servers 'just in case they need emergency access.' The administrator has no malicious intent. How should this be classified and handled?",
    "answers": [
      { "id": "a", "text": "This is not an insider threat because the administrator had good intentions" },
      { "id": "b", "text": "This is an unintentional insider threat — the administrator's actions, regardless of intent, created unauthorized backdoor accounts that represent significant security vulnerabilities. The backdoors could be discovered and exploited by external attackers. Handling should include: immediate remediation of the backdoor accounts, security education on proper emergency access procedures (break-glass processes), review of what other unauthorized changes this administrator may have made, and process controls preventing future unauthorized account creation" },
      { "id": "c", "text": "This is acceptable behavior for a system administrator — emergency access is a legitimate need" },
      { "id": "d", "text": "Only malicious insiders are classified as insider threats — negligent actions are excluded" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Intent does not determine the security risk — unauthorized backdoor accounts are dangerous regardless of why they were created.",
      "b": "Unintentional insider threats are a major category — well-meaning employees taking unauthorized security shortcuts create real vulnerabilities. The response addresses both the immediate risk and the root cause. This is the correct answer.",
      "c": "Emergency access should go through approved break-glass processes — informal backdoor accounts bypass all access controls and audit trails.",
      "d": "Negligent and accidental insider actions are a primary insider threat category — intent does not determine classification."
    }
  },
  {
    "id": 181,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Organized crime",
    "difficulty": "easy",
    "text": "Which characteristic BEST distinguishes organized crime threat actors from unskilled attackers?",
    "answers": [
      { "id": "a", "text": "Organized crime uses more sophisticated technical tools" },
      { "id": "b", "text": "Organized crime operates as structured business enterprises — with dedicated roles (developers, money launderers, negotiators), profit-driven operations, reinvestment of proceeds into capabilities, and sustainable long-term criminal business models rather than opportunistic individual attacks" },
      { "id": "c", "text": "Organized crime exclusively targets financial institutions" },
      { "id": "d", "text": "Organized crime only operates in specific geographic regions" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Technical sophistication varies within organized crime — some use sophisticated tools, others purchase capabilities as a service.",
      "b": "Organized crime's defining characteristic is organizational structure and profit motivation — they operate cybercrime as a business with roles, revenue streams, and reinvestment. This distinguishes them from individuals. This is the correct answer.",
      "c": "Organized crime targets any profitable victim — ransomware campaigns target healthcare, manufacturing, and many other sectors.",
      "d": "Cybercriminal organizations are global — Eastern European, Asian, and other regional groups operate internationally."
    }
  },
  {
    "id": 182,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Organized crime",
    "difficulty": "medium",
    "text": "A ransomware group operates as a Ransomware-as-a-Service (RaaS) model — the group develops the ransomware and provides it to affiliates who conduct attacks in exchange for a revenue share. How does this model affect the threat landscape?",
    "answers": [
      { "id": "a", "text": "RaaS makes ransomware less effective since affiliates share the revenue" },
      { "id": "b", "text": "RaaS dramatically expands the threat landscape by separating technical capability development from attack execution — affiliates with minimal technical skill can conduct sophisticated ransomware attacks using the group's tooling. This increases attack volume, provides the core group with deniability, and scales the criminal operation beyond what a single group could execute directly" },
      { "id": "c", "text": "RaaS only affects large enterprises — small businesses are not targeted by affiliates" },
      { "id": "d", "text": "RaaS groups are easier to disrupt because they have more members to arrest" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Revenue sharing is a feature enabling scaling — RaaS significantly increases ransomware volume and reach.",
      "b": "RaaS democratizes ransomware — the core group profits from scale while affiliates conduct attacks using enterprise-grade tooling. This is the correct answer.",
      "c": "Affiliates attack targets of all sizes — small businesses are frequently targeted because they often have weaker defenses.",
      "d": "RaaS makes disruption harder — taking down the core infrastructure does not stop affiliates who may switch to other RaaS providers."
    }
  },
  {
    "id": 183,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Organized crime",
    "difficulty": "hard",
    "text": "An organized crime group conducts business email compromise (BEC) attacks — impersonating executives to redirect wire transfers. Unlike ransomware, BEC leaves no malware artifacts. How does this change the detection and defense approach?",
    "answers": [
      { "id": "a", "text": "BEC is a ransomware variant — the same controls apply" },
      { "id": "b", "text": "BEC is a social engineering attack with no malware component — traditional technical controls (AV, EDR) cannot detect it. Defense requires: email authentication (SPF, DKIM, DMARC) preventing domain spoofing; user training on BEC recognition; out-of-band verification procedures for wire transfers above thresholds; email header analysis for subtle spoofing indicators; and financial controls requiring dual authorization for transfers. Detection relies on process and behavioral controls rather than technical security tools" },
      { "id": "c", "text": "BEC can be blocked entirely by installing antivirus on email servers" },
      { "id": "d", "text": "BEC only targets email — no other communication vectors are used" }
    ],
    "correct": "b",
    "explanations": {
      "a": "BEC and ransomware are fundamentally different attack types requiring different defenses.",
      "b": "BEC's purely social engineering nature means technical security tools provide limited detection — process controls, email authentication, and financial verification procedures are the primary defenses. This is the correct answer.",
      "c": "Antivirus addresses malware — BEC has no malware component for AV to detect.",
      "d": "BEC increasingly uses phone calls (vishing), text messages, and other channels alongside email — defense must address all communication vectors."
    }
  },
  {
    "id": 184,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Organized crime",
    "difficulty": "hard",
    "text": "Law enforcement successfully takes down the infrastructure of a major ransomware group, seizing servers and arresting members. Six months later, a new ransomware group emerges with similar TTPs. What does this pattern reveal about organized cybercrime resilience?",
    "answers": [
      { "id": "a", "text": "The same group reformed — law enforcement takedowns have permanent effect" },
      { "id": "b", "text": "Organized cybercrime demonstrates structural resilience: remaining members form new groups; released/escaped members recruit new teams; the underlying criminal business model remains profitable; tooling, techniques, and knowledge persist among the ecosystem; and international jurisdictional gaps limit law enforcement effectiveness. Takedowns disrupt but rarely permanently eliminate the threat capability" },
      { "id": "c", "text": "Law enforcement takedowns are completely ineffective and should be abandoned" },
      { "id": "d", "text": "The pattern proves different criminal organizations share the same code — they are all the same group" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The group may have reformed or new actors adopted similar TTPs — takedowns are disruptive but rarely permanent.",
      "b": "The cybercriminal ecosystem is resilient — talent, tools, and methods survive infrastructure takedowns. The profitable business model continuously incentivizes reconstitution. This is the correct answer.",
      "c": "Law enforcement takedowns do provide real disruption and deterrence — they are valuable even without permanent elimination.",
      "d": "Similar TTPs may indicate shared tooling, former members, or independent convergent development — not necessarily the same group."
    }
  },
  {
    "id": 185,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Shadow IT",
    "difficulty": "easy",
    "text": "What is shadow IT and why does it create security risks?",
    "answers": [
      { "id": "a", "text": "Shadow IT refers to attackers who mimic legitimate IT staff to gain physical access" },
      { "id": "b", "text": "Shadow IT refers to technology systems, software, or services used by employees or departments without official IT knowledge or approval — creating security risks because these systems bypass security controls, compliance requirements, patching, monitoring, and data governance policies" },
      { "id": "c", "text": "Shadow IT refers to IT systems that operate in dark data centers without proper documentation" },
      { "id": "d", "text": "Shadow IT refers to legacy systems that are no longer officially supported but still in use" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Physical social engineering by attackers posing as IT staff is a different threat — shadow IT involves employees using unauthorized technology.",
      "b": "Shadow IT emerges when employees use unsanctioned tools (personal cloud storage, free SaaS apps, unauthorized software) that bypass IT security controls and governance. This is the correct answer.",
      "c": "Undocumented data centers may be shadow IT — but shadow IT broadly includes any unauthorized technology use, not just physical infrastructure.",
      "d": "Legacy systems are typically known to IT — shadow IT specifically refers to technology unknown to or unapproved by IT."
    }
  },
  {
    "id": 186,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Shadow IT",
    "difficulty": "medium",
    "text": "A marketing team uses a free cloud-based file sharing service to collaborate on campaigns containing customer PII because the approved corporate solution is too slow. What specific security and compliance risks does this shadow IT usage create?",
    "answers": [
      { "id": "a", "text": "No risk — the marketing team has a legitimate business need and used available resources" },
      { "id": "b", "text": "Customer PII stored in an unapproved service creates: data governance failures (where is data, who controls it?); regulatory non-compliance (GDPR, CCPA may require data to be in approved, auditable systems); no corporate DLP monitoring; unknown data retention and deletion practices of the free service; potential data breaches if the free service lacks enterprise security; inability to respond to data subject access requests; and loss of corporate data if team members leave" },
      { "id": "c", "text": "The only risk is a performance improvement — the approved service should be made faster" },
      { "id": "d", "text": "Shadow IT risks only apply to enterprise software — free consumer services are safe" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Business need does not justify bypassing data governance — the risks are real regardless of motivation.",
      "b": "Shadow IT with PII creates cascading compliance and security failures — the organization has no visibility, control, or governance over this data. This is the correct answer.",
      "c": "The performance issue is a valid root cause — but the response must address both the immediate security risk and the underlying need.",
      "d": "Free consumer services often have weaker enterprise security controls and different data handling practices than enterprise-grade solutions."
    }
  },
  {
    "id": 187,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Shadow IT",
    "difficulty": "hard",
    "text": "A CISO discovers that 47 different cloud services are in use across the organization that are not in the approved technology catalog. Traditional network controls blocked known unauthorized services but employees found workarounds. What strategic approach addresses shadow IT at scale?",
    "answers": [
      { "id": "a", "text": "Block all cloud services — approve nothing until each is individually vetted" },
      { "id": "b", "text": "Implement a Cloud Access Security Broker (CASB) for visibility and graduated control; create a streamlined self-service technology approval process addressing the speed/agility need that drives shadow IT; implement usage-based governance allowing low-risk services with monitoring while enforcing controls on high-risk ones; and address root causes by ensuring approved tools actually meet business needs. Blocking without alternatives drives more shadow IT" },
      { "id": "c", "text": "Accept all 47 services as approved — they are already in use" },
      { "id": "d", "text": "Shadow IT cannot be managed — employees will always find ways around controls" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Blanket blocking that drives workarounds has already failed — the approach must address root causes while implementing better controls.",
      "b": "Effective shadow IT management requires both visibility (CASB), risk-based governance, and addressing the root cause (approved tools not meeting needs). Pure prohibition without alternatives drives more shadow IT. This is the correct answer.",
      "c": "Retroactive approval without security review is not governance — it institutionalizes the security gap.",
      "d": "Shadow IT can be significantly reduced through the right combination of controls, process improvement, and business engagement."
    }
  },
  {
    "id": 188,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Shadow IT",
    "difficulty": "hard",
    "text": "A developer creates a custom internal tool that bypasses the approved software development lifecycle because they believe the process is 'too bureaucratic.' The tool is deployed on a production server and processes customer data. This is shadow IT within IT. What unique risks does this scenario present?",
    "answers": [
      { "id": "a", "text": "Internal developer tools have no security risk since they were created by trusted employees" },
      { "id": "b", "text": "Developer-created shadow IT presents unique risks: the tool was not security-reviewed (potential vulnerabilities in code processing customer data); not tested for reliability (production failures); not documented (single point of knowledge failure if the developer leaves); no patch management (vulnerabilities discovered later cannot be tracked and remediated); and circumvention of the SDLC means security gates (SAST, code review, penetration testing) were skipped for production customer data processing" },
      { "id": "c", "text": "The risk is limited to compliance violations — technical security is unaffected" },
      { "id": "d", "text": "Internal tools are inherently safer than external services since they stay within the network" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Developer intent and trust level do not compensate for the absence of security review — untested code processing customer data in production is a significant risk.",
      "b": "SDLC bypass eliminates all security gates — the tool could have SQL injection, authentication bypass, or data handling vulnerabilities that security review would have caught. This is the correct answer.",
      "c": "Unreviewed code processing customer data has real technical security vulnerabilities beyond compliance gaps.",
      "d": "Network location does not make code secure — internally hosted vulnerable code is still exploitable by internal users or through other compromised systems."
    }
  },
  {
    "id": 189,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Internal/external",
    "difficulty": "easy",
    "text": "How does distinguishing between internal and external threat actors affect security control design?",
    "answers": [
      { "id": "a", "text": "The distinction is irrelevant — the same controls apply to all threats" },
      { "id": "b", "text": "External threats originate outside the organization and must penetrate perimeter defenses — controls focus on preventing unauthorized access. Internal threats already have legitimate access — controls focus on monitoring behavior, limiting access scope (least privilege), and detecting misuse of authorized access. Conflating the two leads to gaps in either perimeter security or insider threat detection" },
      { "id": "c", "text": "External threats are always more dangerous than internal threats" },
      { "id": "d", "text": "Internal threats are impossible to defend against because employees have legitimate access" }
    ],
    "correct": "b",
    "explanations": {
      "a": "External and internal threats require fundamentally different control approaches — same controls for both leaves significant gaps.",
      "b": "The access baseline differs: external attackers must break in while insiders already have access. Controls must address both attack paths distinctly. This is the correct answer.",
      "c": "Both internal and external threats cause significant damage — neither is universally more dangerous.",
      "d": "Internal threats are defensible through least privilege, behavioral monitoring, separation of duties, and other controls."
    }
  },
  {
    "id": 190,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Internal/external",
    "difficulty": "medium",
    "text": "A former employee's credentials are used to access corporate systems 2 days after their termination. This threat actor is BEST classified as:",
    "answers": [
      { "id": "a", "text": "Purely external — former employees are no longer internal" },
      { "id": "b", "text": "This represents the insider-to-external transition problem — former employees become external actors at termination, but may retain access through inadequate offboarding. The threat combines insider knowledge (of systems, credentials, and where valuable data is) with external actor status. Controls must address both: timely access revocation (offboarding) and monitoring for post-termination access attempts" },
      { "id": "c", "text": "Purely internal — the person was previously an employee" },
      { "id": "d", "text": "A nation-state actor using stolen credentials" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Technically external but with insider knowledge — the transition threat is a specific security challenge requiring both offboarding controls and post-termination monitoring.",
      "b": "Former employees represent a hybrid threat — external actors with insider knowledge and potentially retained access. Offboarding must immediately revoke all access. This is the correct answer.",
      "c": "The person is no longer an insider at termination — though they retain insider knowledge.",
      "d": "Nothing in the scenario suggests nation-state involvement — a former employee using retained credentials is the most likely explanation."
    }
  },
  {
    "id": 191,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Internal/external",
    "difficulty": "hard",
    "text": "A Zero Trust architecture treats all traffic as potentially hostile regardless of whether it originates internally or externally. How does this philosophy change the traditional internal vs. external threat classification for control design?",
    "answers": [
      { "id": "a", "text": "Zero Trust makes the internal/external distinction completely irrelevant for all purposes" },
      { "id": "b", "text": "Zero Trust shifts the control paradigm: rather than trusting internal traffic and scrutinizing external traffic, every access request is verified regardless of origin. This does not make the internal/external distinction irrelevant — insider threats still require behavioral monitoring and data access controls, and external threats still require preventing unauthorized access. Zero Trust addresses the gap where lateral movement by internal or external actors exploited implicit network trust" },
      { "id": "c", "text": "Zero Trust only applies to external threats — internal users are still trusted" },
      { "id": "d", "text": "Zero Trust eliminates the need for any security controls beyond network perimeter protection" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Zero Trust changes how controls are applied — not whether the distinction exists. Insider threat and external threat characteristics still inform different control approaches.",
      "b": "Zero Trust removes implicit network-location-based trust while the internal/external distinction still informs threat modeling — insider threats need behavioral controls, external threats need access prevention. Zero Trust closes the gap where network location determined trust level. This is the correct answer.",
      "c": "Zero Trust explicitly removes internal user trust — every user, internal or external, must verify for each access request.",
      "d": "Zero Trust requires comprehensive controls across identity, device, network, and data — not just perimeter protection."
    }
  },
  {
    "id": 192,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Internal/external",
    "difficulty": "hard",
    "text": "A penetration test reveals that an external attacker who gains initial foothold through a phishing attack can laterally move to access financial systems within 4 hours due to overly permissive internal network policies. How does this finding reflect the internal vs. external threat relationship?",
    "answers": [
      { "id": "a", "text": "The finding only demonstrates an external threat — internal network issues are unrelated" },
      { "id": "b", "text": "The finding reveals how external threats exploit internal control gaps: external attackers who successfully breach the perimeter immediately become de facto internal threats with access to internal resources. Permissive internal networks designed for insider convenience become attack highways for external actors. The security implication is that internal controls (network segmentation, least privilege, micro-segmentation) must assume the internal network may be compromised by external actors" },
      { "id": "c", "text": "The finding only demonstrates an internal threat — the phishing vector is irrelevant" },
      { "id": "d", "text": "Internal network policies are beyond the scope of external threat remediation" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The external breach enabling internal lateral movement is precisely why internal controls matter for external threat defense.",
      "b": "External threats leverage internal control gaps after breaching the perimeter — the full kill chain spans external (initial access) and internal (lateral movement, privilege escalation) phases. Defense requires both perimeter and internal controls. This is the correct answer.",
      "c": "Both vectors are relevant — the phishing attack enabled the internal lateral movement.",
      "d": "External threat remediation requires addressing internal controls that amplify the impact of external breaches."
    }
  },
  {
    "id": 193,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Resources/funding",
    "difficulty": "easy",
    "text": "How does an attacker's level of resources and funding affect their threat capability?",
    "answers": [
      { "id": "a", "text": "Resources only determine how many attacks can be conducted — not the sophistication" },
      { "id": "b", "text": "Resources and funding enable: development of custom malware and zero-day exploits; hiring of skilled specialists; purchasing of criminal services (access brokers, bulletproof hosting); sustaining long-term operations; acquiring expensive hardware for cryptanalysis or credential cracking; and corrupting insiders. Well-funded threat actors can pursue targets that would defeat resource-constrained attackers" },
      { "id": "c", "text": "Funding is irrelevant since the most effective attacks use free public tools" },
      { "id": "d", "text": "Only nation-state actors have significant funding — criminal groups operate with minimal resources" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Resources directly enable capability development — zero-day research, custom tooling, and sustained operations require significant investment.",
      "b": "Resources are a force multiplier: they enable custom capability development, talent acquisition, sustained operations, and purchasing capabilities from the criminal ecosystem. This is the correct answer.",
      "c": "While effective attacks can use public tools, resources enable capabilities beyond what free tools provide — zero-days, custom malware, and long-term operations require investment.",
      "d": "Organized crime generates billions in revenue — many criminal groups have substantial resources comparable to nation-state programs in some areas."
    }
  },
  {
    "id": 194,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Resources/funding",
    "difficulty": "medium",
    "text": "A nation-state threat actor uses a zero-day vulnerability that took an estimated 6-12 months of reverse engineering to discover. What does the investment required to find this zero-day reveal about the threat actor's resources?",
    "answers": [
      { "id": "a", "text": "Zero-days are freely available on the internet — no significant resources are required" },
      { "id": "b", "text": "Six to twelve months of skilled reverse engineer time represents hundreds of thousands of dollars in personnel cost alone — plus research infrastructure, test environments, and operational security. This level of investment is only sustainable for threat actors with substantial ongoing funding: nation-states, very well-funded criminal organizations, or access to expensive zero-day markets where such exploits sell for hundreds of thousands of dollars" },
      { "id": "c", "text": "Zero-days can be found by automated tools — human resources are not required" },
      { "id": "d", "text": "The investment is irrelevant — zero-days provide no special advantage over known exploits" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Zero-days are not freely available — high-quality exploits sell for hundreds of thousands of dollars on legitimate and black markets.",
      "b": "Zero-day research requires sustained investment in skilled personnel and research infrastructure — this resource requirement is a meaningful threat actor differentiator. This is the correct answer.",
      "c": "Automated fuzzing and vulnerability discovery tools exist but significant human expertise is required to develop reliable exploits from discovered vulnerabilities.",
      "d": "Zero-day vulnerabilities are specifically valuable because they have no available patches — they provide significant advantages over known, potentially patched exploits."
    }
  },
  {
    "id": 195,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Resources/funding",
    "difficulty": "hard",
    "text": "A security team is building a threat model for their organization. They identify two potential threat actors: a well-funded nation-state APT and a low-funded hacktivist group. How should resource disparity influence their defensive prioritization?",
    "answers": [
      { "id": "a", "text": "Defend equally against both — resource levels do not affect defensive priorities" },
      { "id": "b", "text": "Defenses against a well-funded APT must address: zero-day exploits (patch where possible, use detection for gaps), supply chain attacks, advanced persistent access, and sophisticated evasion. Against low-funded hacktivists: prioritize DDoS mitigation, web application hardening, and public-facing asset security. The nation-state threat requires deeper defense-in-depth, advanced threat detection, and incident response capability — while hacktivist defenses focus on availability and public-facing systems" },
      { "id": "c", "text": "Focus only on the nation-state threat — hacktivists are never dangerous" },
      { "id": "d", "text": "Focus only on hacktivist threats — nation-state attacks cannot be defended against" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Resource levels directly affect what attacks are possible — defenses must be calibrated to the threat actor's capabilities.",
      "b": "Threat modeling based on resource levels enables proportionate, efficient defense — different threat actors require different defensive focuses. Both merit attention with different control priorities. This is the correct answer.",
      "c": "Hacktivists can cause significant reputational and operational damage — they merit specific defenses.",
      "d": "While nation-state attacks cannot be completely prevented, defenses significantly reduce impact, dwell time, and attacker success — abandoning defense is not appropriate."
    }
  },
  {
    "id": 196,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Resources/funding",
    "difficulty": "hard",
    "text": "A criminal group offers 'access-as-a-service' — selling access to already-compromised corporate networks to other criminals. How does this criminal market dynamic affect the effective resources available to low-funded threat actors?",
    "answers": [
      { "id": "a", "text": "Access markets have no effect — attackers must compromise systems themselves" },
      { "id": "b", "text": "Access markets (initial access brokers) fundamentally change the resource equation: low-funded actors can purchase pre-established network footholds, eliminating the need to invest in initial access capability. This dramatically lowers the barrier to sophisticated attacks — a well-funded actor's initial access investment is monetized repeatedly by selling to multiple buyers, enabling even resource-constrained groups to execute attacks inside corporate networks" },
      { "id": "c", "text": "Access-as-a-service only benefits nation-state actors" },
      { "id": "d", "text": "Purchasing access is illegal and therefore criminals do not use these markets" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Initial access broker markets are a well-established component of the criminal ecosystem — purchased access is widely used.",
      "b": "Access markets commoditize initial access — the most resource-intensive phase of an attack can be purchased, enabling less-resourced actors to operate inside corporate networks. This is the correct answer.",
      "c": "Access markets serve various buyers including ransomware affiliates and other criminal groups — not exclusively nation-states.",
      "d": "Criminal markets operate precisely because criminals use them — legality does not prevent criminals from using efficient criminal services."
    }
  },
  {
    "id": 197,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Level of sophistication/capability",
    "difficulty": "easy",
    "text": "How does a threat actor's level of sophistication affect the controls an organization must deploy to defend against them?",
    "answers": [
      { "id": "a", "text": "Sophistication level has no effect — the same basic controls stop all threat actors" },
      { "id": "b", "text": "Highly sophisticated threat actors can bypass or evade many standard controls — they use novel exploits, custom malware that evades AV, advanced evasion techniques, and living-off-the-land methods. Defense against sophisticated actors requires advanced detection capabilities (behavioral analytics, threat hunting), zero-trust architecture, and layered controls that assume outer defenses may fail" },
      { "id": "c", "text": "More sophisticated attackers are always stopped by perimeter firewalls" },
      { "id": "d", "text": "Sophistication only affects how quickly an attack succeeds — not whether defenses work" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Standard controls that stop unskilled attackers are routinely bypassed by sophisticated ones — control selection must account for attacker capability.",
      "b": "Sophistication directly determines which controls are effective — signature-based AV, simple firewalls, and basic logging are insufficient against advanced actors who specifically develop techniques to bypass them. This is the correct answer.",
      "c": "Sophisticated actors routinely bypass perimeter firewalls through phishing, supply chain attacks, and other techniques that establish connections from inside out.",
      "d": "Sophistication affects both success probability and control effectiveness — sophisticated actors defeat defenses that stop less capable attackers."
    }
  },
  {
    "id": 198,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Level of sophistication/capability",
    "difficulty": "medium",
    "text": "An attacker uses only PowerShell, WMI, and scheduled tasks — all legitimate Windows tools — to move laterally and maintain persistence without dropping any malware files. What capability level does this demonstrate?",
    "answers": [
      { "id": "a", "text": "Low capability — the attacker is using free tools" },
      { "id": "b", "text": "High capability — living-off-the-land (LotL) techniques using only legitimate system tools demonstrates sophisticated evasion capability. This approach evades file-based detection (AV/EDR signature matching), reduces forensic artifacts, and blends malicious activity with normal system operations — requiring behavioral analysis and advanced detection rather than signature-based controls" },
      { "id": "c", "text": "Medium capability — PowerShell is only moderately difficult to use" },
      { "id": "d", "text": "Low capability — sophisticated attackers always use custom malware" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Using free tools does not indicate low capability — the sophistication is in the technique and evasion, not the cost of tools.",
      "b": "LotL attacks demonstrate high capability — operating entirely within legitimate tool behavior evades signature detection and requires sophisticated behavioral analytics to detect. This is the correct answer.",
      "c": "PowerShell proficiency is necessary but insufficient — the sophistication is the operational security discipline of never using detectable malware.",
      "d": "Custom malware is increasingly risky for attackers — LotL is often preferred by sophisticated actors precisely because it avoids malware detection."
    }
  },
  {
    "id": 199,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Level of sophistication/capability",
    "difficulty": "hard",
    "text": "A threat intelligence report indicates an APT group has developed a previously unknown vulnerability in a widely-used VPN product. They have been selectively using it only against high-value targets to avoid disclosure. What does this selective use reveal about their capability level and strategic sophistication?",
    "answers": [
      { "id": "a", "text": "Selective use indicates the exploit does not work reliably" },
      { "id": "b", "text": "Selective use of a zero-day demonstrates operational sophistication beyond technical capability: they understand that broad use risks discovery and patching (burning the exploit); they have intelligence capability to identify which targets merit zero-day use vs. less valuable techniques; and they manage their exploit inventory as strategic assets. This tradecraft discipline distinguishes nation-state actors from less sophisticated groups who would broadly deploy valuable exploits until patched" },
      { "id": "c", "text": "Selective use means the group has limited copies of the exploit" },
      { "id": "d", "text": "A sophisticated group would use their best exploits on all available targets simultaneously" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Reliability issues would manifest as failed attacks — selective use against confirmed high-value targets indicates working capability and operational discipline.",
      "b": "Zero-day stewardship — selective use to avoid burning an exploit — is a hallmark of nation-state operational sophistication beyond mere technical capability. This is the correct answer.",
      "c": "Zero-day exploits are typically limited only by the number of vulnerable targets — selective use is a strategic choice, not a supply constraint.",
      "d": "Broad use would accelerate discovery and patching — strategic actors deliberately avoid burning valuable exploits on low-value targets."
    }
  },
  {
    "id": 200,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Level of sophistication/capability",
    "difficulty": "hard",
    "text": "A security team is trying to attribute an attack to either a nation-state or sophisticated organized crime group. Both have similar technical TTPs. What non-technical indicators might help distinguish between them?",
    "answers": [
      { "id": "a", "text": "Technical TTPs are the only valid attribution evidence" },
      { "id": "b", "text": "Non-technical attribution indicators include: targeting patterns (nation-states often target government, defense, and critical infrastructure; criminal groups target financially valuable organizations); monetization behavior (criminal groups typically monetize access; nation-states rarely do); operational timing (nation-state operations may align with geopolitical events); victim notification by intelligence agencies (governments often warn of state-sponsored activity); and dwell time objectives (nation-states may persist silently; criminals typically monetize faster)" },
      { "id": "c", "text": "Attribution is irrelevant — defenses should be the same regardless" },
      { "id": "d", "text": "Geographic IP origin definitively distinguishes nation-state from criminal actors" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Technical TTPs can be deliberately mimicked (false flag operations) — non-technical indicators provide complementary attribution evidence.",
      "b": "Attribution combines technical and non-technical indicators — targeting patterns, monetization behavior, and geopolitical context provide meaningful attribution signals beyond TTPs alone. This is the correct answer.",
      "c": "Attribution matters for response strategy, law enforcement engagement, and geopolitical considerations — it is not purely academic.",
      "d": "Nation-state actors routinely use proxies, VPNs, and compromised infrastructure in other countries — IP geography is not reliable attribution evidence."
    }
  },
  {
    "id": 201,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Data exfiltration",
    "difficulty": "easy",
    "text": "Data exfiltration as a threat actor motivation refers to which attacker objective?",
    "answers": [
      { "id": "a", "text": "Destroying targeted data to cause operational disruption" },
      { "id": "b", "text": "Stealing and removing sensitive data from the target organization — to sell it, use it for competitive advantage, provide it to foreign governments, or use it for leverage against the victim" },
      { "id": "c", "text": "Encrypting data for ransom payment" },
      { "id": "d", "text": "Modifying data to cause incorrect decisions based on false information" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Data destruction is a separate motivation (service disruption or sabotage) — exfiltration specifically involves copying and removing data.",
      "b": "Data exfiltration is the unauthorized copying and removal of data from an organization — the data retains value after theft and can be monetized or leveraged in various ways. This is the correct answer.",
      "c": "Ransomware encryption is a separate technique — though some attackers both exfiltrate and encrypt (double extortion).",
      "d": "Data modification for deception is an integrity attack — exfiltration involves copying and removing data without necessarily modifying it."
    }
  },
  {
    "id": 202,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Data exfiltration",
    "difficulty": "medium",
    "text": "An attacker exfiltrates intellectual property from a pharmaceutical company — specifically drug formulas and clinical trial data. This data does not appear for sale on criminal markets. Which threat actor and motivation does this MOST suggest?",
    "answers": [
      { "id": "a", "text": "Organized crime — they will sell the data later" },
      { "id": "b", "text": "Nation-state espionage — IP theft for competitive advantage (benefiting domestic pharmaceutical companies or government health programs) rather than criminal monetization. Nation-states conduct economic espionage to accelerate their domestic industries with stolen research, avoiding the criminal market exposure that would reveal the theft" },
      { "id": "c", "text": "Hacktivist — they will leak the data to expose unethical research practices" },
      { "id": "d", "text": "Unskilled attacker — they stole the data without a plan to use it" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Organized crime monetizes data through criminal markets — not appearing for sale suggests the data serves a different purpose.",
      "b": "Nation-state economic espionage steals IP for domestic benefit — stolen pharmaceutical research reduces development costs and time for the sponsoring country's industry. Criminal markets would risk exposure. This is the correct answer.",
      "c": "Hacktivists typically publish stolen data publicly — sensitive IP disappearing without public disclosure is inconsistent with hacktivist motives.",
      "d": "An attacker without a plan would be unlikely to specifically target high-value research data — the targeting suggests clear strategic intent."
    }
  },
  {
    "id": 203,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Data exfiltration",
    "difficulty": "hard",
    "text": "A DLP system detects large data transfers to an external cloud storage service from a senior engineer's account over 3 weeks — totaling 40GB. The engineer claims they were backing up personal files. Security investigation reveals the data includes proprietary source code. What response process should be followed?",
    "answers": [
      { "id": "a", "text": "Accept the employee's explanation — senior engineers have broad data access rights" },
      { "id": "b", "text": "Treat as a potential insider exfiltration incident: preserve forensic evidence immediately (do not alert the employee); engage HR and legal counsel; conduct a forensic analysis of exactly what data was transferred; determine whether the data constitutes trade secrets; interview the employee with HR present; assess whether the data reached unauthorized parties; and pursue appropriate disciplinary, legal, and remediation steps based on findings. The senior title does not exempt from data protection policies" },
      { "id": "c", "text": "Immediately terminate the employee without investigation" },
      { "id": "d", "text": "Only escalate if the engineer admits to exfiltration" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Data access rights do not include exfiltrating proprietary data to personal storage — the explanation must be verified through investigation.",
      "b": "Insider data exfiltration investigations require forensic preservation, legal involvement, and systematic investigation before action — premature confrontation can compromise evidence. This is the correct answer.",
      "c": "Immediate termination without investigation creates legal liability and destroys evidence.",
      "d": "Waiting for admission is not an investigation methodology — forensic analysis provides evidence independent of the employee's statement."
    }
  },
  {
    "id": 204,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Data exfiltration",
    "difficulty": "hard",
    "text": "A threat actor exfiltrates data slowly over 6 months — averaging 50MB per day rather than a large one-time transfer. How does slow exfiltration complicate detection and what specific controls are needed?",
    "answers": [
      { "id": "a", "text": "Slow exfiltration is not a real technique — attackers always move quickly" },
      { "id": "b", "text": "Slow exfiltration is deliberately designed to blend with normal network traffic and evade volume-based DLP thresholds and anomaly detection. Detection requires: cumulative data transfer analysis over extended periods (not just single-session thresholds); behavioral baseline comparison (is 50MB/day unusual for this user/system?); data sensitivity classification (the content matters as much as the volume); egress traffic destination analysis; and potentially endpoint monitoring to identify staged data before exfiltration" },
      { "id": "c", "text": "Standard DLP policies block all slow exfiltration regardless of data type" },
      { "id": "d", "text": "Slow exfiltration is impossible to detect — organizations should accept this risk" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Slow exfiltration ('low and slow') is a well-documented technique used by advanced actors to avoid detection.",
      "b": "Low-and-slow exfiltration defeats point-in-time DLP thresholds — detection requires longitudinal analysis, behavioral baselining, and content-based controls. This is the correct answer.",
      "c": "Standard DLP typically uses session or time-based thresholds — specifically designed to miss slow exfiltration.",
      "d": "Slow exfiltration is detectable with appropriate longitudinal monitoring and behavioral analytics — acceptance is not required."
    }
  },
  {
    "id": 205,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Espionage",
    "difficulty": "easy",
    "text": "Which threat actor type MOST commonly conducts cyber espionage operations?",
    "answers": [
      { "id": "a", "text": "Unskilled attackers seeking financial gain" },
      { "id": "b", "text": "Nation-state actors — governments conduct espionage to collect intelligence on foreign governments, military capabilities, diplomatic communications, and economic/scientific research to gain strategic advantage" },
      { "id": "c", "text": "Hacktivists protesting government policies" },
      { "id": "d", "text": "Organized crime groups seeking monetizable data" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Unskilled attackers primarily seek financial gain or notoriety — not strategic intelligence collection.",
      "b": "Espionage is the collection of secret intelligence — nation-states have the motivation (strategic advantage), resources, and patience for long-term espionage operations. This is the correct answer.",
      "c": "Hacktivists seek publicity for their cause — not confidential intelligence collection.",
      "d": "Organized crime seeks monetizable data — espionage for strategic intelligence is not profitable in the criminal marketplace."
    }
  },
  {
    "id": 206,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Espionage",
    "difficulty": "medium",
    "text": "A defense contractor discovers that encrypted communications between their engineers and a government client have been intercepted and decrypted by a foreign intelligence service. The foreign service had compromised the contractor's VPN. What type of threat does this represent?",
    "answers": [
      { "id": "a", "text": "Cybercrime — the attackers accessed the systems without authorization" },
      { "id": "b", "text": "Cyber espionage — a foreign intelligence service targeted the defense contractor to collect sensitive government communications and potentially classified program details. The sophisticated VPN compromise and focus on government communications are consistent with state-sponsored intelligence collection rather than criminal monetization" },
      { "id": "c", "text": "Hacktivism — the foreign service was protesting the defense contractor's activities" },
      { "id": "d", "text": "Insider threat — the attacker used stolen credentials" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Unauthorized access is criminal, but the motivation and actor (foreign intelligence service) classify this as espionage — the criminal law perspective and threat actor classification are different analyses.",
      "b": "Foreign intelligence services targeting defense contractors for government communications is a classic espionage operation — the motivation is strategic intelligence collection, not financial gain. This is the correct answer.",
      "c": "Foreign intelligence services do not conduct hacktivism — they collect intelligence for national advantage.",
      "d": "Using stolen credentials is a technique — the threat actor classification is based on who (foreign intelligence service) and why (espionage), not the specific technique used."
    }
  },
  {
    "id": 207,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Espionage",
    "difficulty": "hard",
    "text": "A nation-state espionage operation targets a pharmaceutical company's COVID-19 vaccine research rather than government agencies. How does economic espionage against private companies serve nation-state interests?",
    "answers": [
      { "id": "a", "text": "Nations only conduct espionage against other governments — corporate targets indicate criminal activity" },
      { "id": "b", "text": "Economic espionage against private companies serves nation-state interests by: accelerating domestic research and development (stealing years of research); enabling competitive advantage for domestic industries; providing access to dual-use technologies with military applications; reducing costs of developing competing products; and potentially enabling faster public health response. The COVID-19 example demonstrates that critical research represents national strategic interest even when conducted by private entities" },
      { "id": "c", "text": "Nation-states would only target government health agencies — not private companies" },
      { "id": "d", "text": "Economic espionage provides no national advantage since stolen research still requires development" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Economic espionage against private companies is a major nation-state activity — they target wherever valuable strategic information resides.",
      "b": "Nation-states conduct economic espionage against private companies to capture research value — this is particularly relevant for pharmaceuticals, semiconductors, and other strategic technologies. This is the correct answer.",
      "c": "Vaccine research was concentrated in private pharmaceutical companies during COVID-19 — nation-states target where the valuable information is.",
      "d": "Stealing research eliminates years of development time and potentially billions in R&D costs — significant national advantage even accounting for additional development work."
    }
  },
  {
    "id": 208,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Espionage",
    "difficulty": "hard",
    "text": "A counterintelligence team discovers that a foreign intelligence service has been recruiting human sources inside an organization alongside their cyber operations. How does the combination of human intelligence (HUMINT) and cyber espionage create compounded security risks?",
    "answers": [
      { "id": "a", "text": "Human and cyber intelligence operations are entirely separate — combining them provides no additional advantage" },
      { "id": "b", "text": "Combined HUMINT and cyber operations create compounded risks: human sources provide insider knowledge that makes cyber operations more targeted and effective (knowing which system has the data, who has access); cyber operations reduce the risk to human sources by obtaining some intelligence without human exposure; human sources can bypass technical controls by providing credentials or physically enabling access; and the combination makes attribution and detection significantly harder as both vectors must be investigated simultaneously" },
      { "id": "c", "text": "Human sources in an organization can always be detected before causing harm" },
      { "id": "d", "text": "Cyber controls are sufficient to prevent damage from compromised human sources" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Combined operations are specifically designed to leverage synergies — human intelligence guides cyber operations and vice versa.",
      "b": "The combination of HUMINT and SIGINT/cyber operations creates a more capable intelligence collection capability than either alone — the synergies are specifically exploited by sophisticated intelligence services. This is the correct answer.",
      "c": "Human insider recruitment is specifically difficult to detect — it is a primary focus of counterintelligence programs precisely because of this challenge.",
      "d": "Cyber controls address technical attack vectors — a human insider with legitimate access can bypass many technical controls."
    }
  },
  {
    "id": 209,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Service disruption",
    "difficulty": "easy",
    "text": "Which attack type is MOST directly motivated by service disruption?",
    "answers": [
      { "id": "a", "text": "Phishing — collecting credentials for future access" },
      { "id": "b", "text": "Distributed Denial of Service (DDoS) — overwhelming a target's resources to make services unavailable to legitimate users, either for ideological reasons, competitive advantage, extortion, or nation-state sabotage" },
      { "id": "c", "text": "SQL injection — extracting data from databases" },
      { "id": "d", "text": "Keylogging — capturing credentials as users type them" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Phishing targets credential collection for future access — not immediate service disruption.",
      "b": "DDoS is the quintessential service disruption attack — making services unavailable through overwhelming traffic or resource exhaustion directly serves disruption objectives. This is the correct answer.",
      "c": "SQL injection typically targets data extraction (exfiltration motivation) — not service disruption.",
      "d": "Keylogging serves credential theft objectives — not service disruption."
    }
  },
  {
    "id": 210,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Service disruption",
    "difficulty": "medium",
    "text": "A ransomware attack encrypts all files on an organization's systems. Beyond the ransom payment objective, how does this attack also achieve a service disruption motivation?",
    "answers": [
      { "id": "a", "text": "Ransomware only serves financial motivation — service disruption is incidental" },
      { "id": "b", "text": "Ransomware achieves service disruption as a core mechanism: encrypted systems become unusable, forcing operational shutdown. Service disruption is the leverage mechanism enabling the ransom demand — without disruption (unavailable data and systems), there would be no ransom motivation. Nation-states and terrorists increasingly use ransomware-style attacks purely for disruption without ransom demands, separating the two motivations" },
      { "id": "c", "text": "Ransomware does not disrupt services — systems continue functioning with encrypted data" },
      { "id": "d", "text": "Service disruption is only a side effect — ransom collection is the exclusive objective" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Service disruption is integral to ransomware's mechanism — it is not merely incidental.",
      "b": "Ransomware operates by creating service disruption — the disruption IS the leverage. Nation-state actors have deployed ransomware-style wiper attacks (NotPetya) purely for disruption without ransom demands, demonstrating the two motivations can be separated. This is the correct answer.",
      "c": "Encrypted files render systems non-operational — service disruption is precisely what ransomware achieves.",
      "d": "Service disruption is the mechanism AND a motivation — pure disruption attacks (wipers without ransom demands) demonstrate disruption as a standalone objective."
    }
  },
  {
    "id": 211,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Service disruption",
    "difficulty": "hard",
    "text": "A geopolitical conflict escalates and a nation-state conducts cyberattacks against an adversary's power grid, causing widespread outages during winter. What makes targeting critical infrastructure a particularly concerning service disruption motivation?",
    "answers": [
      { "id": "a", "text": "Power grid attacks are not possible — critical infrastructure has sufficient protection" },
      { "id": "b", "text": "Critical infrastructure disruption has outsized second and third-order effects: power grid failure cascades to hospitals (patient deaths), water treatment (public health), financial systems (economic damage), emergency services (reduced response capability), and supply chains. These cascading effects mean cyberattacks on critical infrastructure can achieve kinetic-equivalent harm without physical weapons — making it an increasingly used tool in nation-state conflict with significant international law implications" },
      { "id": "c", "text": "The primary concern is economic — power outages only cause financial damage" },
      { "id": "d", "text": "Critical infrastructure attacks are only relevant during active military conflicts" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Critical infrastructure attacks have been demonstrated — Ukraine's power grid attacks are documented examples.",
      "b": "Critical infrastructure attacks create cascading societal impacts far beyond the immediate service disruption — the second and third-order effects on dependent systems create kinetic-equivalent harm. This is the correct answer.",
      "c": "Economic damage is one dimension — loss of life from hospital failures and public health crises are more severe consequences.",
      "d": "Critical infrastructure attacks occur during peacetime tensions — they are used as tools of coercion and leverage before military conflict as well."
    }
  },
  {
    "id": 212,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Service disruption",
    "difficulty": "hard",
    "text": "A competitor hires a criminal group to conduct a sustained DDoS attack against a company during their peak sales season (Black Friday), causing $5 million in lost revenue. How does this scenario combine multiple threat actor types and motivations?",
    "answers": [
      { "id": "a", "text": "This is purely organized crime — the competitor is irrelevant" },
      { "id": "b", "text": "This combines: organized crime (the criminal group executing the attack for payment) acting as hired proxies for; a competitor (functioning as a threat actor with economic motivation) who uses the criminal group's service disruption capability for competitive advantage. The competitor's motivation is economic (eliminating competitor revenue) rather than typical criminal extortion. This illustrates how threat actors can be proxies for other parties — complicating attribution and legal response" },
      { "id": "c", "text": "This is purely a competitive business practice — no criminal activity occurred" },
      { "id": "d", "text": "The competitor becomes a nation-state actor by funding the attack" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The competitor as the directing party is central — organized crime served as a proxy tool for the competitor's business motivation.",
      "b": "The scenario combines the organized crime execution capability with the competitor's business motivation — proxy relationships between different threat actor types are well-documented and complicate attribution. This is the correct answer.",
      "c": "Hiring criminals to conduct DDoS attacks is criminal conspiracy — not a legitimate competitive practice.",
      "d": "Being a corporate competitor does not make a party a nation-state actor — this would be corporate cybercrime."
    }
  },
  {
    "id": 213,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Financial gain",
    "difficulty": "easy",
    "text": "Which threat actor type is MOST consistently motivated by financial gain?",
    "answers": [
      { "id": "a", "text": "Nation-state actors" },
      { "id": "b", "text": "Organized crime — they operate cybercrime as a profit-driven business, including ransomware, business email compromise, banking trojans, credit card fraud, and selling stolen data" },
      { "id": "c", "text": "Hacktivists" },
      { "id": "d", "text": "Nation-state actors conducting economic espionage" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Nation-state actors have strategic motivations beyond financial gain — espionage, sabotage, and geopolitical advantage are primary drivers.",
      "b": "Organized crime is defined by its profit motive — all operations ultimately serve financial objectives. This is the correct answer.",
      "c": "Hacktivists are ideologically motivated — their primary goal is advancing a cause, not financial profit.",
      "d": "Economic espionage serves national economic interests — the benefit accrues to the nation, not as direct criminal profit."
    }
  },
  {
    "id": 214,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Financial gain",
    "difficulty": "medium",
    "text": "A ransomware group has received $50 million in ransom payments over the past year. They reinvest 30% into hiring additional developers, purchasing zero-day exploits, and expanding their affiliate network. What does this reinvestment pattern indicate?",
    "answers": [
      { "id": "a", "text": "The group is losing money and trying to break even" },
      { "id": "b", "text": "The group is operating as a sophisticated criminal enterprise — reinvesting profits into capability development and organizational expansion. This business model makes financially motivated criminal groups increasingly capable over time, creating an escalating threat that improves with each successful campaign. The criminal economy is self-sustaining and growing" },
      { "id": "c", "text": "Reinvestment is evidence of nation-state backing — only nations fund zero-day purchases" },
      { "id": "d", "text": "The group will disband after making sufficient profit" }
    ],
    "correct": "b",
    "explanations": {
      "a": "30% reinvestment from a $50M revenue operation is substantial growth investment — not breakeven behavior.",
      "b": "Profit reinvestment into capability development demonstrates that financial motivation drives organizational capability improvement — creating a self-reinforcing threat growth cycle. This is the correct answer.",
      "c": "Successful criminal organizations can afford zero-day purchases without nation-state backing — criminal revenue enables significant capability investment.",
      "d": "Criminal organizations typically continue as long as operations are profitable — profit motive sustains the enterprise rather than driving dissolution."
    }
  },
  {
    "id": 215,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Financial gain",
    "difficulty": "hard",
    "text": "A financially motivated attacker gains access to a company's network. They discover: (1) financial data valuable for stock trading; (2) customer credit card numbers; (3) employee PII; and (4) the opportunity to deploy ransomware. How might a sophisticated criminal group OPTIMALLY monetize this access?",
    "answers": [
      { "id": "a", "text": "Deploy ransomware immediately — it is the highest-value approach" },
      { "id": "b", "text": "A sophisticated criminal group might: (1) exfiltrate financial data for insider trading or sale; (2) exfiltrate credit card data to sell on criminal markets; (3) exfiltrate PII for identity fraud or sale; (4) deploy ransomware only after completing data exfiltration — enabling double extortion (pay to recover AND pay to prevent publication). Immediate ransomware deployment forfeits the exfiltration opportunities. The optimal sequence maximizes revenue from multiple monetization streams simultaneously" },
      { "id": "c", "text": "Sell network access to another criminal group — let them monetize it" },
      { "id": "d", "text": "Report the access to the company for a bug bounty payment" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Immediate ransomware deployment alerts the victim before all data can be exfiltrated — sophisticated actors delay ransomware until exfiltration is complete.",
      "b": "Sophisticated criminal optimization sequences activities to maximize total return — multiple revenue streams from a single access opportunity. Double extortion (exfiltrate then encrypt) is the now-standard sophisticated ransomware approach. This is the correct answer.",
      "c": "Selling access is lower-value — direct exploitation extracts more value than selling to others.",
      "d": "Bug bounty programs apply to security researchers operating within authorized scope — criminal actors who gained unauthorized access are committing crimes regardless of how they disclose."
    }
  },
  {
    "id": 216,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Financial gain",
    "difficulty": "hard",
    "text": "An organization pays a $2 million ransom to recover encrypted systems. Security researchers later determine the decryption tool provided is flawed and only recovers 60% of data. What risk does paying ransoms create for the broader ecosystem and for the paying organization?",
    "answers": [
      { "id": "a", "text": "Paying ransom is always the correct decision — it guarantees data recovery" },
      { "id": "b", "text": "Paying ransom creates: systemic risks (funding criminal operations that will attack more victims; demonstrating that ransomware is profitable encouraging more attackers); and organizational risks (no guarantee of full recovery as demonstrated; organizations that pay are often targeted again as known payers; proceeds fund improved attack capabilities). Law enforcement agencies generally advise against payment while acknowledging the business reality. Proper backup and recovery planning eliminates the payment dilemma" },
      { "id": "c", "text": "Ransom payment has no systemic effect — it only affects the paying organization" },
      { "id": "d", "text": "Paying ransom is illegal in all jurisdictions" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Ransom payment does not guarantee recovery — flawed decryptors, partial recovery, and repeat targeting are documented outcomes.",
      "b": "Ransom payment creates both systemic (funding the criminal ecosystem) and organizational (repeat targeting, imperfect recovery) risks. This is the correct answer.",
      "c": "Ransom payments fund criminal operations that attack other organizations — the systemic effect is significant.",
      "d": "Ransom payment legality varies by jurisdiction and target — payments to sanctioned entities (e.g., certain ransomware groups on OFAC lists) may be illegal, but payment itself is not universally prohibited."
    }
  },
  {
    "id": 217,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Philosophical/political beliefs",
    "difficulty": "easy",
    "text": "A hacktivist group attacks a company involved in deforestation, defacing their website and leaking internal emails. Which motivation BEST describes this attack?",
    "answers": [
      { "id": "a", "text": "Financial gain — they plan to sell the leaked emails" },
      { "id": "b", "text": "Philosophical/political beliefs — the attackers are motivated by environmental ideology, using cyber attacks to advance their cause against an organization whose activities conflict with their beliefs" },
      { "id": "c", "text": "Espionage — they are gathering intelligence on deforestation operations" },
      { "id": "d", "text": "Disruption/chaos — they have no specific grievance with the company" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Hacktivists who leak emails for publicity purposes rarely monetize — the goal is exposure and embarrassment, not financial gain.",
      "b": "Environmental ideology motivating attacks against companies with conflicting practices is a classic philosophical/political motivation for hacktivism. This is the correct answer.",
      "c": "Intelligence gathering for its own sake is espionage — hacktivist data collection serves their advocacy cause.",
      "d": "There is a specific ideological grievance — this is motivated activism, not random chaos."
    }
  },
  {
    "id": 218,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Philosophical/political beliefs",
    "difficulty": "medium",
    "text": "Anonymous-affiliated hacktivists announce plans to target a government's internet censorship infrastructure in support of free speech principles. How does this ideological motivation affect their targeting and tactics?",
    "answers": [
      { "id": "a", "text": "Ideological motivation makes no difference to targeting — all hacktivists target randomly" },
      { "id": "b", "text": "Ideological motivation drives very specific targeting: systems that directly implement the censorship they oppose, making the attack serve both disruption AND communication objectives. Their tactics tend toward high-visibility attacks (defacement, DDoS, data leaks) that generate media coverage and advance their message rather than stealthy operations — the goal is public awareness, not covert capability" },
      { "id": "c", "text": "Free speech hacktivists only use legal means — they do not conduct actual cyberattacks" },
      { "id": "d", "text": "Ideological hacktivists are never successful against government targets" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Hacktivists target specifically based on their beliefs — the ideology determines which organizations are targeted.",
      "b": "Ideological motivation shapes both target selection (organizations opposing their values) and tactics (high-visibility operations that generate attention for their cause). This is the correct answer.",
      "c": "Hacktivists do conduct illegal cyberattacks — their ideology does not constrain them to legal methods.",
      "d": "Hacktivist attacks against governments have succeeded — Anonymous targeted various government websites effectively."
    }
  },
  {
    "id": 219,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Philosophical/political beliefs",
    "difficulty": "hard",
    "text": "A security team learns that their organization is on a hacktivist group's public target list due to their controversial immigration-related contracts with a government. Beyond technical defenses, what non-technical risk management approaches should be considered?",
    "answers": [
      { "id": "a", "text": "Only technical defenses matter — non-technical approaches are not security activities" },
      { "id": "b", "text": "Non-technical risk management includes: executive and board communication about the elevated threat; public relations strategy for reputational damage from potential data leaks; legal review of the target list publication and potential legal remedies; employee security awareness briefing on the elevated threat environment (social engineering, phishing); third-party stakeholder communication if customer data may be at risk; and crisis communication planning for potential attack disclosure — attackers motivated by causing reputational damage require reputational defenses alongside technical ones" },
      { "id": "c", "text": "Cancel the government contracts immediately to remove the motivation" },
      { "id": "d", "text": "Publish a response to the hacktivist group on social media to deter them" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Ideologically motivated attacks specifically target reputational damage — non-technical defenses are essential components of the response.",
      "b": "Hacktivist threats require both technical controls (preventing the attack) and non-technical preparation (managing the reputational and organizational impact if an attack succeeds). This is the correct answer.",
      "c": "Contract cancellation may be appropriate as a business decision — but security strategy should not be driven solely by threat avoidance if it conflicts with legitimate business needs.",
      "d": "Public engagement with hacktivist groups risks escalation and provides them additional publicity — typically not recommended."
    }
  },
  {
    "id": 220,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Philosophical/political beliefs",
    "difficulty": "hard",
    "text": "A nation-state conducts information operations — creating and spreading disinformation through social media — to influence a foreign election. This differs from traditional cyber attacks. How should security professionals classify and address this threat?",
    "answers": [
      { "id": "a", "text": "Information operations are not a cybersecurity issue — only technical attacks are security concerns" },
      { "id": "b", "text": "Information operations represent a hybrid threat combining: philosophical/political motivation (influencing political outcomes) with cyber capabilities (creating fake accounts, hacking and leaking documents). Security professionals must address the technical components (account compromise, infrastructure for disinformation campaigns) while recognizing that the primary impact is societal/political rather than technical. Defense requires collaboration with platform operators, intelligence agencies, and election security teams beyond traditional IT security" },
      { "id": "c", "text": "Information operations are only relevant for government security teams — not private sector security professionals" },
      { "id": "d", "text": "Disinformation campaigns are protected free speech and cannot be addressed by security teams" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Information operations have technical components (account compromise, infrastructure) that fall within cybersecurity scope — the impact extends beyond technical damage.",
      "b": "Information operations are a hybrid threat requiring both technical and non-technical responses across organizational and societal levels. Security professionals address the technical components while recognizing the broader context. This is the correct answer.",
      "c": "Private sector organizations are involved in information operations — as targets (document theft for leaking) and as platforms (social media companies).",
      "d": "Information operations involving hacking and fake account creation involve actual crimes — addressing the technical infrastructure is appropriate security work."
    }
  },
  {
    "id": 221,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Revenge",
    "difficulty": "easy",
    "text": "Which threat actor type is MOST commonly motivated by revenge?",
    "answers": [
      { "id": "a", "text": "Nation-state actors seeking strategic advantage" },
      { "id": "b", "text": "Insider threats — particularly disgruntled current or former employees who feel wronged by their employer and seek to cause harm to the organization as retaliation" },
      { "id": "c", "text": "Organized crime groups seeking financial gain" },
      { "id": "d", "text": "Unskilled attackers seeking notoriety" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Nation-states pursue strategic interests — revenge is not a primary motivator for state-level cyber operations.",
      "b": "Revenge is a primary motivation for insider threats — employees who perceive mistreatment (termination, passed-over promotion, disciplinary action) may act out against the organization using their access. This is the correct answer.",
      "c": "Organized crime pursues profit — their targeting is based on financial opportunity, not personal grievance.",
      "d": "Unskilled attackers typically seek notoriety, excitement, or opportunity — not revenge against specific organizations."
    }
  },
  {
    "id": 222,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Revenge",
    "difficulty": "medium",
    "text": "A system administrator is informed they will be laid off in two weeks. During this period, they delete critical backups and change server passwords. What controls would MOST effectively prevent this revenge-motivated insider action?",
    "answers": [
      { "id": "a", "text": "Install better antivirus software" },
      { "id": "b", "text": "For termination scenarios: immediately revoke or substantially reduce access upon notification (not waiting until the final day); require dual-person authorization for critical operations like backup management; implement immutable backups that cannot be deleted through administrative interfaces; monitor privileged user activity with heightened scrutiny; and conduct a proper offboarding process. The two-week window with full access is the control gap that enabled the revenge attack" },
      { "id": "c", "text": "Train the administrator on cybersecurity ethics" },
      { "id": "d", "text": "The incident cannot be prevented — employees being terminated always have malicious intent" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Antivirus does not detect privileged administrators misusing their legitimate access.",
      "b": "Insider threat controls for at-risk employees require immediate access adjustment, dual-authorization for critical operations, and immutable backup protection — the full two-week window with unrestricted access was the exploitable vulnerability. This is the correct answer.",
      "c": "Ethics training cannot overcome revenge motivation — technical controls are necessary.",
      "d": "Not all terminated employees act maliciously — but controls must address the elevated risk period."
    }
  },
  {
    "id": 223,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Revenge",
    "difficulty": "hard",
    "text": "A former employee who was publicly blamed for a major project failure that wasn't their fault launches a targeted attack against their former manager and company 18 months later. What does the 18-month delay suggest about revenge-motivated threats?",
    "answers": [
      { "id": "a", "text": "The 18-month delay proves this was not revenge — revenge attacks happen immediately" },
      { "id": "b", "text": "Revenge-motivated threats may have significant delays between the triggering event and the attack — the former employee may have needed time to develop or acquire attack capability; the grievance may have been renewed by a new triggering event; or the delay represents waiting for reduced monitoring (assuming attention fades over time). Long-term revenge threats mean organizations cannot assume risk ends when an employee departs — continued monitoring of former high-access employee account activity is warranted" },
      { "id": "c", "text": "The 18-month delay proves this was organized crime, not revenge" },
      { "id": "d", "text": "The delay means the attack must have been less sophisticated" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Revenge attacks occur across all timeframes — the delay does not rule out revenge motivation.",
      "b": "Delayed revenge attacks are well-documented — the time gap may reflect capability development, renewed triggering events, or deliberate strategy. Post-departure monitoring of former high-risk employees addresses this risk. This is the correct answer.",
      "c": "Organized crime would not wait 18 months for a personal revenge attack against a specific manager — the personal targeting is consistent with revenge motivation.",
      "d": "Attack sophistication is independent of timing — the delay does not imply reduced capability."
    }
  },
  {
    "id": 224,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Revenge",
    "difficulty": "hard",
    "text": "An organization terminates an employee following a genuine disciplinary process. The employee believes the termination was unjust. A security team wants to assess insider threat risk during and after termination. What behavioral indicators suggest elevated revenge motivation risk?",
    "answers": [
      { "id": "a", "text": "Any negative emotion about termination indicates high revenge risk" },
      { "id": "b", "text": "Behavioral indicators of elevated risk include: public statements threatening harm to the organization or individuals; unusual access pattern changes (accessing systems not related to their role, bulk downloading); evidence of planning (searches for attack methods, discussion of revenge in monitored communications); significant grievance escalation with HR or legal; and unusual interest in security systems. Not all disgruntled employees become threats — risk assessment must balance security with respecting employee dignity during a difficult process" },
      { "id": "c", "text": "All terminated employees should be treated as equally high-risk" },
      { "id": "d", "text": "Behavioral indicators are irrelevant — only technical controls matter for insider threat" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Normal negative emotions about termination are expected — specific behavioral escalation indicators distinguish elevated risk.",
      "b": "Risk assessment for revenge-motivated insider threats uses specific behavioral indicators to prioritize monitoring rather than treating all terminations equally. This is the correct answer.",
      "c": "Treating all terminated employees as equally high-risk creates false positives and morale issues — graduated risk assessment is more appropriate.",
      "d": "Behavioral indicators are primary inputs for insider threat risk assessment — technical controls implement the monitoring but behavioral analysis drives the risk classification."
    }
  },
  {
    "id": 225,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Disruption/chaos",
    "difficulty": "easy",
    "text": "Which threat actor motivation involves attacking systems with no specific strategic, financial, or ideological objective — simply to cause disorder?",
    "answers": [
      { "id": "a", "text": "Financial gain — disruption enables extortion" },
      { "id": "b", "text": "Disruption/chaos — some threat actors, particularly unskilled attackers and certain extremist groups, are motivated by causing disorder, seeing damage, and demonstrating their ability to disrupt without a specific strategic objective beyond the disruption itself" },
      { "id": "c", "text": "Espionage — data collection through disruptive operations" },
      { "id": "d", "text": "Philosophical beliefs — disruption serves ideological goals" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Financial gain requires monetization — disruption/chaos motivation does not require financial return.",
      "b": "Disruption/chaos as a standalone motivation is demonstrated by wiper attacks with no ransom, vandalism attacks with no clear message, and some extremist actors whose goal is simply creating disorder. This is the correct answer.",
      "c": "Espionage is intelligence collection — disruption/chaos motivation involves attacks intended to damage rather than collect.",
      "d": "Philosophical/political disruption has specific ideological goals — disruption/chaos motivation lacks specific strategic objectives."
    }
  },
  {
    "id": 226,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Disruption/chaos",
    "difficulty": "medium",
    "text": "A wiper malware attack destroys data on thousands of systems in a country's banking sector during a period of political tension. No ransom is demanded. What motivation does this MOST suggest?",
    "answers": [
      { "id": "a", "text": "Financial gain — the attackers are planning future ransom demands" },
      { "id": "b", "text": "Disruption/chaos with possible nation-state direction — wiper attacks that destroy data without financial demands suggest motivation centered on causing maximum disruption and economic damage rather than profit. The political context and targeting of critical financial infrastructure suggests nation-state involvement using disruption as a geopolitical tool" },
      { "id": "c", "text": "Data exfiltration — the data was exfiltrated before wiping" },
      { "id": "d", "text": "Ethical hacking — the attacker is exposing banking sector vulnerabilities" }
    ],
    "correct": "b",
    "explanations": {
      "a": "The absence of ransom demands and the destructive nature indicate disruption motivation — ransomware would preserve data for negotiation leverage.",
      "b": "Wiper attacks destroying data without ransom in a political context represent disruption/chaos motivation — potentially as a nation-state geopolitical tool. NotPetya and similar attacks demonstrated this pattern. This is the correct answer.",
      "c": "Data exfiltration before wiping is possible but the primary observable motivation from the described behavior is disruption.",
      "d": "Ethical hackers operate within authorized scopes with disclosure intentions — destroying production banking data is criminal, not ethical."
    }
  },
  {
    "id": 227,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Disruption/chaos",
    "difficulty": "hard",
    "text": "Nation-state actors sometimes use disruption attacks against civilian infrastructure during geopolitical conflicts. How does the disruption/chaos motivation differ when used by nation-states versus individual actors?",
    "answers": [
      { "id": "a", "text": "Nation-state disruption is identical to individual disruption — motivation is the same" },
      { "id": "b", "text": "Nation-state disruption is strategically purposeful: it serves geopolitical objectives (coercion, weakening adversary morale, demonstrating capability, signaling resolve) rather than being truly chaotic. What appears as chaos serves a strategic purpose — creating economic damage, undermining public confidence, or setting conditions for military operations. Individual disruption/chaos motivation is typically non-strategic. The distinction matters for attribution, response, and proportionality of defensive measures" },
      { "id": "c", "text": "Nation-states never conduct disruption attacks — they are too sophisticated for such tactics" },
      { "id": "d", "text": "Individual actors causing disruption always have national backing" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Nation-state disruption is instrumentalized for strategic purposes — not truly chaotic.",
      "b": "Nation-state 'disruption/chaos' serves specific strategic objectives despite appearing chaotic — this distinction affects threat intelligence interpretation and response strategy. This is the correct answer.",
      "c": "Nation-states extensively use disruption tactics — they are documented tools in nation-state conflict.",
      "d": "Individual actors causing disruption may be entirely independent — state backing is not assumed without evidence."
    }
  },
  {
    "id": 228,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Disruption/chaos",
    "difficulty": "hard",
    "text": "A security team is trying to determine whether a ransomware attack in their environment is financially motivated (legitimate ransomware) or disruption-motivated (ransomware used as a cover for a destructive attack). What technical indicators help distinguish these motivations?",
    "answers": [
      { "id": "a", "text": "Both types of attacks are identical — motivation cannot be inferred from technical evidence" },
      { "id": "b", "text": "Disruption-disguised-as-ransomware indicators include: unusable/fake decryption keys (the decryptor does not actually work); no negotiation infrastructure (no dark web contact page); overwriting the master boot record or file system structures beyond what's needed for encryption; destroying shadow copies and backups beyond the ransomware norm; attacking systems with no financial value alongside valuable ones; and unusually fast propagation prioritizing breadth over dwell time. Legitimate ransomware preserves decryption capability as the business model depends on it" },
      { "id": "c", "text": "Only the ransom demand amount distinguishes the two — large demands indicate disruption" },
      { "id": "d", "text": "Technical indicators are unreliable — only political context determines motivation" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Technical indicators do provide motivation inference — particularly around decryption infrastructure integrity.",
      "b": "Destructive attacks disguised as ransomware (NotPetya, WhisperGate) have distinct technical indicators — the key differentiator is whether decryption infrastructure is genuine, since a financial model requires actually decrypting for paying victims. This is the correct answer.",
      "c": "Ransom amount is not a reliable indicator — disruption attacks may use realistic ransom amounts as cover.",
      "d": "Technical indicators are valuable — political context complements but does not replace technical analysis."
    }
  },
  {
    "id": 229,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "War",
    "difficulty": "easy",
    "text": "How do cyber operations fit into modern warfare?",
    "answers": [
      { "id": "a", "text": "Cyber operations are separate from warfare and have no military applications" },
      { "id": "b", "text": "Cyber operations are an established domain of modern warfare — used for intelligence collection, disabling adversary military communications and systems, disrupting critical infrastructure to degrade civilian resilience, deception operations, and coordination with kinetic military operations" },
      { "id": "c", "text": "Cyber warfare only involves hacking military networks — civilian infrastructure is excluded" },
      { "id": "d", "text": "Cyber operations in warfare are limited to defensive activities only" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Cyber operations are now a recognized military domain — cyber commands are established in major military forces worldwide.",
      "b": "Cyber is the fifth operational domain (alongside land, sea, air, space) in modern military doctrine — it encompasses offensive, defensive, and intelligence operations. This is the correct answer.",
      "c": "Civilian infrastructure is frequently targeted in cyber warfare to disrupt supply chains, degrade morale, and weaken economic capacity.",
      "d": "Military cyber operations are both offensive and defensive — offensive operations targeting adversary systems are a core military cyber capability."
    }
  },
  {
    "id": 230,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "War",
    "difficulty": "medium",
    "text": "Prior to a conventional military invasion, a nation-state conducts cyberattacks against the target country's power grid, banking systems, and government communications. What is the strategic purpose of these pre-invasion cyber operations?",
    "answers": [
      { "id": "a", "text": "Pre-invasion cyber operations are purely symbolic — they cause no real damage" },
      { "id": "b", "text": "Pre-invasion cyber operations serve multiple strategic purposes: degrading the defender's military command and control capability; disrupting civilian infrastructure to reduce national resilience and morale; creating uncertainty and confusion in the defender's leadership; preventing effective communication of the invasion to the population or international community; and potentially forcing defenders to focus on cyber incidents rather than military preparation" },
      { "id": "c", "text": "Pre-invasion cyber operations are only used when kinetic attacks are not available" },
      { "id": "d", "text": "Pre-invasion cyber operations are designed to give warning — to provide time to surrender before invasion" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Pre-invasion cyber operations can cause significant damage — power outages, banking disruption, and communication blackouts have real effects.",
      "b": "Cyber operations before kinetic military action serve to degrade, confuse, and demoralize the defender — creating favorable conditions for the subsequent military operation. This is the correct answer.",
      "c": "Cyber operations complement kinetic operations in combined arms warfare — they are used alongside kinetic capability, not as a substitute.",
      "d": "Pre-invasion cyber operations are designed to degrade the defender's ability to resist — not to provide surrender warnings."
    }
  },
  {
    "id": 231,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "War",
    "difficulty": "hard",
    "text": "A private company's industrial control systems are collateral damage in a cyber warfare operation targeting the country's energy infrastructure. The company had no direct involvement in the conflict. What security and legal challenges does civilian collateral damage in cyber warfare create?",
    "answers": [
      { "id": "a", "text": "Private companies are not legitimate collateral damage — all cyber warfare only affects military targets" },
      { "id": "b", "text": "Cyber warfare creates complex collateral damage challenges: cyber weapons (like worms) can propagate beyond intended targets to civilian systems globally; attributing nation-state attacks to private company insurers and legal systems is difficult; international humanitarian law's distinction between military and civilian targets is difficult to enforce in cyberspace; recovery costs fall on the private company not party to the conflict; and cyber sovereignty questions complicate legal recourse. Companies in geopolitically sensitive sectors must account for nation-state conflict as a threat scenario" },
      { "id": "c", "text": "Collateral damage victims have straightforward legal remedies against attacking nations" },
      { "id": "d", "text": "Only companies directly supporting military operations are at risk of collateral damage" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Cyber weapons propagate without precise boundaries — civilian systems are regularly affected in cyber warfare operations.",
      "b": "Cyber warfare collateral damage creates significant challenges: attribution, legal jurisdiction, insurance coverage, and international law application are all complex and unresolved. This is the correct answer.",
      "c": "Legal remedies against nation-states for cyber warfare collateral damage are extremely limited — sovereign immunity and attribution challenges make recovery nearly impossible.",
      "d": "Malware like NotPetya affected companies worldwide with no connection to the original conflict — critical infrastructure in any country is at risk."
    }
  },
  {
    "id": 232,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "War",
    "difficulty": "hard",
    "text": "An organization operates critical infrastructure in a country experiencing increasing geopolitical tensions with a foreign adversary. How should the threat of nation-state cyber warfare operations change their security posture?",
    "answers": [
      { "id": "a", "text": "Geopolitical tensions have no impact on private sector security decisions" },
      { "id": "b", "text": "Elevated geopolitical risk requires: threat intelligence monitoring specific to relevant nation-state actors; enhanced network monitoring for APT indicators; operational technology (OT/ICS) security assessment since critical infrastructure is a primary warfare target; incident response planning for destructive attacks (not just data breaches); coordination with national CISA/equivalent for threat intelligence sharing; review of supply chain dependencies on adversary countries; and tabletop exercises for wartime cyber scenarios including extended outages" },
      { "id": "c", "text": "Only government agencies need to adjust posture for geopolitical tensions" },
      { "id": "d", "text": "Standard cybersecurity best practices are sufficient — nation-state threats require no additional preparation" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Critical infrastructure operators are primary targets in nation-state cyber warfare — geopolitical context directly affects risk level.",
      "b": "Nation-state warfare threat requires specific security posture adjustments beyond standard cybersecurity — particularly for critical infrastructure operators who are primary targets in modern warfare doctrine. This is the correct answer.",
      "c": "Private sector critical infrastructure is a primary target in nation-state cyber warfare — not only government agencies.",
      "d": "Nation-state warfare threats require specific preparation beyond standard best practices — the threat actor capabilities and objectives differ significantly from criminal threats."
    }
  },
  {
    "id": 233,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Blackmail",
    "difficulty": "easy",
    "text": "What distinguishes blackmail as a threat actor motivation from pure financial gain?",
    "answers": [
      { "id": "a", "text": "There is no difference — blackmail and financial gain are identical motivations" },
      { "id": "b", "text": "Blackmail uses leveraged threats — threatening to expose damaging information unless demands are met. Unlike straightforward financial theft, blackmail creates ongoing leverage and may involve non-monetary demands. The victim pays to prevent harm (exposure, reputation damage) rather than directly losing money to theft" },
      { "id": "c", "text": "Blackmail never involves financial demands — it only seeks behavioral changes" },
      { "id": "d", "text": "Blackmail is only relevant in physical crimes — not cyber threats" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Blackmail is a specific leverage-based motivation — it differs from straightforward theft in its mechanism and victim psychology.",
      "b": "Blackmail uses threatened harm as leverage — paying to prevent exposure differs from pure theft in the attacker's mechanism and the victim's calculus. This is the correct answer.",
      "c": "Blackmail frequently involves financial demands — threatening exposure unless money is paid is a core blackmail pattern.",
      "d": "Cyber blackmail is a documented and growing threat — threatening to publish compromising data or exposing sensitive information online is a cyber blackmail variant."
    }
  },
  {
    "id": 234,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Blackmail",
    "difficulty": "medium",
    "text": "An attacker compromises a healthcare executive's email and discovers personal communications that would be damaging to their reputation. They send a private message demanding $500,000 to stay silent. Which security controls would MOST help prevent and detect this type of attack?",
    "answers": [
      { "id": "a", "text": "Antivirus software on the executive's device" },
      { "id": "b", "text": "Email security with MFA protecting the executive's account (preventing initial compromise); email monitoring for unusual access patterns (detecting unauthorized access); data classification and access controls limiting who can read sensitive communications; security awareness training on protecting personal devices and accounts; incident response procedures for extortion scenarios; and advance executive briefing on reporting potential blackmail attempts to security teams rather than engaging with attackers independently" },
      { "id": "c", "text": "Network perimeter firewalls protecting against external access" },
      { "id": "d", "text": "Password manager for the executive's device" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Antivirus protects against malware — email account compromise may occur through phishing, credential stuffing, or stolen session tokens without malware.",
      "b": "Targeted blackmail prevention requires: preventing initial access (MFA, email security), detecting unauthorized access (monitoring), protecting sensitive data, and preparing executives for the response. This is the correct answer.",
      "c": "Perimeter firewalls protect the network — email account compromise via phishing or stolen credentials bypasses perimeter controls.",
      "d": "Password managers help with credential hygiene — but the broader control set is needed for preventing and detecting executive email compromise."
    }
  },
  {
    "id": 235,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Blackmail",
    "difficulty": "hard",
    "text": "A ransomware group employs 'double extortion' — encrypting data AND threatening to publish it publicly unless ransom is paid. How does the blackmail dimension change the risk calculus for organizations considering whether to pay?",
    "answers": [
      { "id": "a", "text": "Double extortion has no additional impact — the decision is the same as standard ransomware" },
      { "id": "b", "text": "Double extortion creates a separate and compounding blackmail threat: even with perfect backups enabling recovery without paying the ransom, organizations still face the blackmail threat of data publication. The decision must now separately evaluate: can we restore operations without paying? (backup question) AND can we accept the consequences of the data being published? (blackmail question). Data sensitivity, regulatory notification requirements, and reputational damage determine the blackmail component's leverage" },
      { "id": "c", "text": "Double extortion always requires payment — there is no alternative" },
      { "id": "d", "text": "Double extortion is only effective against organizations without backups" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Double extortion creates two separate leverage mechanisms that must be evaluated independently.",
      "b": "Double extortion decouples the recovery question from the data exposure question — organizations with backups can recover operations but still face the blackmail threat of publication. This is the correct answer.",
      "c": "Payment does not guarantee non-publication — criminals are not contractually bound to honor commitments.",
      "d": "Organizations with backups still face the blackmail/publication threat — double extortion specifically targets organizations who might otherwise ignore ransom demands."
    }
  },
  {
    "id": 236,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Blackmail",
    "difficulty": "hard",
    "text": "A nation-state intelligence service covertly collects compromising personal information about foreign government officials and uses it to influence their behavior (kompromat). How does this represent blackmail as a nation-state tool?",
    "answers": [
      { "id": "a", "text": "Kompromat is not related to cybersecurity — it is purely a political activity" },
      { "id": "b", "text": "Kompromat (compromising material) represents state-level blackmail as a foreign intelligence tool — using personal information to coerce foreign officials into taking favorable actions (sharing intelligence, changing policy positions, enabling espionage operations). Cyber espionage operations that compromise personal communications, financial records, and private behavior serve this blackmail function. This blurs the line between cybersecurity and counterintelligence, requiring security teams to consider personal privacy protection as an organizational security concern" },
      { "id": "c", "text": "Kompromat is always fabricated — real information cannot be used for blackmail" },
      { "id": "d", "text": "Only criminal organizations use blackmail — nation-states only conduct honorable intelligence operations" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Kompromat collection frequently involves cyber espionage — stealing personal communications, financial data, and private information is part of the intelligence collection for coercion.",
      "b": "Nation-state blackmail through cyber-collected kompromat is a documented intelligence tactic — it extends cybersecurity considerations to personal privacy protection for high-value individuals. This is the correct answer.",
      "c": "Kompromat uses real compromising information — fabricated information is a separate disinformation tactic.",
      "d": "Intelligence services widely use coercive techniques including kompromat — this is a documented intelligence practice."
    }
  },
  {
    "id": 237,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Ethical",
    "difficulty": "easy",
    "text": "What distinguishes an ethical hacker from malicious threat actors?",
    "answers": [
      { "id": "a", "text": "Ethical hackers use less sophisticated techniques than malicious actors" },
      { "id": "b", "text": "Ethical hackers (penetration testers, security researchers) operate with explicit authorization from the target organization — their goal is to identify and report vulnerabilities to improve security, not to exploit them for personal gain. The same technical techniques may be used but the authorization, intent, and outcome differ fundamentally" },
      { "id": "c", "text": "Ethical hackers only test systems they personally own" },
      { "id": "d", "text": "Ethical hackers always notify the media about vulnerabilities they discover" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Ethical hackers use the same techniques as malicious actors — the sophistication level is not the distinguishing factor.",
      "b": "Authorization and intent are the defining differences — ethical hackers have permission to find vulnerabilities and report them for remediation. This is the correct answer.",
      "c": "Ethical hackers test systems they are authorized to test — not just systems they own.",
      "d": "Responsible disclosure (not public media) is the ethical standard — coordinating with vendors before public disclosure is the ethical practice."
    }
  },
  {
    "id": 238,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Ethical",
    "difficulty": "medium",
    "text": "A security researcher discovers a critical vulnerability in a widely-used medical device that could allow attackers to alter dosage settings remotely. They attempt to contact the manufacturer for 90 days with no response. What ethical considerations apply to their disclosure decision?",
    "answers": [
      { "id": "a", "text": "The researcher should publish immediately to protect patients — confidentiality is irrelevant" },
      { "id": "b", "text": "Ethical considerations include: patient safety demands timely disclosure (delay enables continued risk to patients); responsible disclosure norms suggest allowing manufacturer time to patch (typically 90 days is considered reasonable); after 90 days without response, coordinating with ICS-CERT/FDA who can apply regulatory pressure; public disclosure may be appropriate if manufacturer remains unresponsive AND poses imminent patient risk; and the researcher must balance transparency (protecting patients) against enabling attackers (by publishing exploitable details)" },
      { "id": "c", "text": "The researcher should sell the vulnerability to the highest bidder — they are not employed by the manufacturer" },
      { "id": "d", "text": "The researcher should continue waiting indefinitely — public disclosure is never appropriate" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Immediate publication without coordination enables attackers to exploit the vulnerability before patches are available — this is the harm responsible disclosure aims to prevent.",
      "b": "Medical device vulnerability disclosure involves complex ethical trade-offs — patient safety urgency vs. enabling exploitation. Regulatory authority coordination is particularly important for life-critical devices. This is the correct answer.",
      "c": "Selling vulnerabilities to brokers conflicts with the ethical hacker motivation — this crosses into potentially criminal gray market activity.",
      "d": "Indefinite waiting enables ongoing patient risk — responsible disclosure timelines exist precisely to balance these concerns."
    }
  },
  {
    "id": 239,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Ethical",
    "difficulty": "hard",
    "text": "A penetration tester during an authorized engagement discovers evidence of active criminal activity — illegal financial transactions in the target organization's database. They were not asked to look for this. What ethical and legal obligations apply?",
    "answers": [
      { "id": "a", "text": "The penetration tester should ignore it — they were not hired to investigate financial crime" },
      { "id": "b", "text": "The penetration tester faces complex ethical and legal obligations: professional ethics require reporting material findings within the scope of their engagement; legal obligations vary by jurisdiction (mandatory reporting requirements for certain crimes); reporting to the client organization creates risk if the client is complicit; the tester may need to consult legal counsel about their own obligations; and documenting findings carefully protects them. The rules of engagement should have addressed this scenario — future engagements should include guidance on out-of-scope discoveries" },
      { "id": "c", "text": "The penetration tester must immediately report to law enforcement — no other obligations exist" },
      { "id": "d", "text": "Penetration testers have no obligations beyond their contracted scope" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Discovering evidence of active crime creates ethical and potentially legal obligations beyond contracted scope.",
      "b": "Incidental discovery of criminal evidence during authorized testing creates complex obligations — professional ethics, legal requirements, and reporting chain considerations all apply. This is the correct answer.",
      "c": "Immediate law enforcement reporting may not be the only or immediate obligation — legal counsel consultation is appropriate first.",
      "d": "Ethical obligations exist beyond contracted scope — particularly for serious crimes with ongoing harm."
    }
  },
  {
    "id": 240,
    "domain": "2.0",
    "objective": "2.1",
    "keyword": "Ethical",
    "difficulty": "hard",
    "text": "A government agency approaches an ethical hacker to develop offensive cyber weapons for use against adversaries. The hacker has the technical skills but has ethical concerns about dual-use of their capabilities. What ethical framework should they apply to this decision?",
    "answers": [
      { "id": "a", "text": "Government requests always override personal ethics — compliance is mandatory" },
      { "id": "b", "text": "The ethical hacker must evaluate: legality and legitimacy of the use case (is this authorized by appropriate legal authority?); intended targets and collateral damage potential (cyber weapons can propagate beyond targets); oversight and accountability mechanisms (who reviews the weapons' use?); personal alignment with the mission and legal framework; and professional codes of conduct. Ethical hackers who develop offensive capabilities bear moral responsibility for foreseeable misuse — consulting professional and legal advisors is appropriate before accepting such engagements" },
      { "id": "c", "text": "Ethical hackers should never work with government agencies — all offensive capabilities are unethical" },
      { "id": "d", "text": "Developing offensive cyber weapons is inherently ethical if the government paying for it approves" }
    ],
    "correct": "b",
    "explanations": {
      "a": "Government requests are not absolute ethical overrides — legal authorization is necessary but ethical evaluation remains the individual's responsibility.",
      "b": "Offensive capability development involves significant ethical complexity — legality, oversight, collateral damage, and personal responsibility are all relevant factors. This is the correct answer.",
      "c": "Authorized government offensive cyber operations are a legitimate and legal activity — blanket prohibition is not ethically required.",
      "d": "Government approval is one factor but does not constitute complete ethical justification — particularly for capabilities with significant collateral damage potential."
    }
  }


];
