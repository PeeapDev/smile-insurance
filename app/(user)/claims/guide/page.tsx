"use client"

import Link from "next/link"

export default function MotorInsuranceClaimGuidePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Motor Insurance Claims — Comprehensive Guide</h1>
        <p className="text-muted-foreground">
          A clear, step-by-step reference to help you understand, report, and manage a motor insurance claim.
        </p>
      </header>

      <nav className="rounded-md border p-4 bg-muted/30">
        <p className="font-medium mb-2">Quick Navigation</p>
        <ul className="grid gap-1 sm:grid-cols-2 md:grid-cols-3 text-sm">
          <li><a className="underline" href="#understanding">I. Understanding Claims</a></li>
          <li><a className="underline" href="#types">II. Types of Claims</a></li>
          <li><a className="underline" href="#process">III. The Claim Process</a></li>
          <li><a className="underline" href="#info">IV. Information to Provide</a></li>
          <li><a className="underline" href="#factors">V. Factors Affecting Claims</a></li>
          <li><a className="underline" href="#tips">VI. Tips for a Smooth Experience</a></li>
          <li><a className="underline" href="#challenges">VII. Challenges & Solutions</a></li>
          <li><a className="underline" href="#resources">VIII. Resources</a></li>
          <li><a className="underline" href="#how-to">How to Report a Claim (Detailed)</a></li>
          <li><a className="underline" href="#summary">Quick Reference Summary</a></li>
        </ul>
      </nav>

      <section id="understanding" className="space-y-3">
        <h2 className="text-2xl font-semibold">I. Understanding Motor Insurance Claims</h2>
        <p>
          A motor insurance claim is a formal request to your insurance company for compensation to cover
          losses or damages resulting from a motor vehicle accident or other covered event (e.g., theft,
          vandalism, fire). The process involves notifying your insurer, providing details, and working with an
          adjuster to assess damages and determine a settlement.
        </p>
      </section>

      <section id="types" className="space-y-3">
        <h2 className="text-2xl font-semibold">II. Types of Motor Insurance Claims</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Collision</strong>: Damage from a collision with another vehicle or object.</li>
          <li><strong>Comprehensive</strong>: Non-collision losses (theft, vandalism, fire, hail, falling objects).</li>
          <li><strong>Third-Party Liability</strong>: Bodily injury or property damage you cause to others.</li>
          <li><strong>Uninsured/Underinsured Motorist</strong>: Your injuries/damages when hit by an uninsured/underinsured driver.</li>
          <li><strong>PIP (where applicable)</strong>: Medical expenses and lost wages regardless of fault.</li>
        </ul>
      </section>

      <section id="process" className="space-y-3">
        <h2 className="text-2xl font-semibold">III. The Claim Process (Step-by-Step)</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            <strong>Accident Occurs</strong> — Ensure safety, call police if necessary, exchange information, and gather evidence (photos, witness contacts).
          </li>
          <li>
            <strong>Report the Accident</strong> — Contact your insurer ASAP, provide basics (date, time, location, description), and obtain a claim number.
          </li>
          <li>
            <strong>File a Claim</strong> — Complete claim form and submit documentation (police report, photos, estimates, medical records).
          </li>
          <li>
            <strong>Investigation & Assessment</strong> — Adjuster is assigned, investigates and assesses damages; may interview involved parties. Insurer may obtain an independent estimate.
          </li>
          <li>
            <strong>Coverage Determination</strong> — Insurer reviews policy coverage and limits.
          </li>
          <li>
            <strong>Negotiation</strong> (if needed) — Provide evidence if you disagree with assessment or liability.
          </li>
          <li>
            <strong>Settlement</strong> — Agree on an amount and sign a release. Insurer issues payment.
          </li>
          <li>
            <strong>Repair/Replacement</strong> — Repair vehicle or replace if total loss.
          </li>
        </ol>
      </section>

      <section id="info" className="space-y-3">
        <h2 className="text-2xl font-semibold">IV. Key Information to Provide</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Policy number and your contact information</li>
          <li>Date, time, and location of the accident</li>
          <li>Description of how the accident occurred</li>
          <li>Other driver(s)/vehicle(s) details (name, contact, license, insurance)</li>
          <li>Police report number (if applicable)</li>
          <li>Witness names and contacts</li>
          <li>Photos of damages and accident scene</li>
        </ul>
      </section>

      <section id="factors" className="space-y-3">
        <h2 className="text-2xl font-semibold">V. Factors That Affect Your Claim</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Policy Coverage</strong>: What’s covered, limits, and exclusions.</li>
          <li><strong>Fault/Liability</strong>: Determines who pays and how much.</li>
          <li><strong>State Laws</strong>: Rules vary by jurisdiction.</li>
          <li><strong>Documentation</strong>: Complete, accurate records are critical.</li>
          <li><strong>Negotiation</strong>: Effective negotiation can improve outcomes.</li>
          <li><strong>Independent Adjuster</strong>: You may hire one to assess damages independently.</li>
        </ul>
      </section>

      <section id="tips" className="space-y-3">
        <h2 className="text-2xl font-semibold">VI. Tips for a Smooth Claim Experience</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Report promptly; delays complicate the process</li>
          <li>Be honest and accurate</li>
          <li>Cooperate fully with the adjuster</li>
          <li>Document everything and keep copies</li>
          <li>Review your policy and understand your rights</li>
          <li>Get multiple estimates when possible</li>
          <li>Communicate clearly and ask questions</li>
          <li>Negotiate when appropriate; seek legal advice if needed</li>
          <li>Be patient and persistent</li>
        </ul>
      </section>

      <section id="challenges" className="space-y-3">
        <h2 className="text-2xl font-semibold">VII. Potential Challenges & How to Address Them</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Denial of Claim</strong>: Ask for the reason; gather evidence and appeal if justified.</li>
          <li><strong>Low Settlement Offer</strong>: Negotiate; provide documentation to support your position.</li>
          <li><strong>Delays</strong>: Follow up regularly for status updates.</li>
          <li><strong>Disputes Over Fault</strong>: Expect further investigation; arbitration may be used.</li>
          <li><strong>Uninsured/Underinsured Driver</strong>: Recovery may require legal action.</li>
        </ul>
      </section>

      <section id="resources" className="space-y-3">
        <h2 className="text-2xl font-semibold">VIII. Resources</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Your insurance policy (coverage, limits, exclusions)</li>
          <li>State insurance department (consumer assistance)</li>
          <li>Insurance trade associations (education)</li>
          <li>Attorneys (legal advice/representation)</li>
        </ul>
      </section>

      <section id="how-to" className="space-y-4">
        <h2 className="text-2xl font-semibold">Comprehensive Guide to Reporting a Motor Insurance Claim</h2>
        <h3 className="text-xl font-medium">A. Immediately After the Accident</h3>
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            <strong>Ensure Safety</strong>: Check for injuries, call ambulance if needed, move vehicles if possible, turn on hazard lights, set up warnings if safe.
          </li>
          <li>
            <strong>Call the Police (if necessary)</strong>: Often required for injuries, significant damage, suspected crime. Get the report number and officer details.
          </li>
          <li>
            <strong>Exchange Information</strong>: Names, contacts, driver’s licenses, vehicle details (make/model/year/plate/VIN), and insurance details. Do not admit fault.
          </li>
          <li>
            <strong>Gather Evidence</strong>: Photos of vehicles and scene, documents, any visible injuries, and witness contacts.
          </li>
          <li>
            <strong>Report to Your Insurer</strong>: Provide policy number; date, time, location; description; other driver details; police report number; photos; witnesses.
          </li>
        </ol>
        <h3 className="text-xl font-medium">B. Filing the Claim</h3>
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            <strong>Claim Form</strong>: Complete accurately and submit all required documentation (police report, photos, repair estimates, medical records, wage loss proof).
          </li>
          <li>
            <strong>Cooperate with the Adjuster</strong>: Provide additional information when requested and communicate clearly.
          </li>
          <li>
            <strong>Damage Assessment</strong>: Insurer may inspect the vehicle or ask for estimates; get a written estimate.
          </li>
          <li>
            <strong>Review Your Policy</strong>: Understand coverage limits, deductibles, and exclusions.
          </li>
          <li>
            <strong>Keep Records</strong>: Retain copies of all claim-related documents and correspondence.
          </li>
        </ol>
        <h3 className="text-xl font-medium">C. After the Claim is Settled</h3>
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            <strong>Review the Settlement Offer</strong>: Ensure it covers repairs/replacement, medical expenses, lost wages, pain and suffering (if applicable), and rental car expenses.
          </li>
          <li>
            <strong>Negotiate if Needed</strong>: Provide evidence; consult an attorney if a fair settlement cannot be reached.
          </li>
          <li>
            <strong>Accept the Settlement</strong>: Sign the release and receive payment.
          </li>
          <li>
            <strong>Repair Your Vehicle</strong>: Use the shop of your choice (if allowed) and verify repair quality.
          </li>
          <li>
            <strong>Follow Up</strong>: Confirm all payments are processed and the claim is closed.
          </li>
        </ol>
      </section>

      <section id="summary" className="space-y-3">
        <h2 className="text-2xl font-semibold">Summarized Guide (Quick Reference)</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Safety first</li>
          <li>Call police if required; get report number</li>
          <li>Exchange info (drivers, vehicles, insurance)</li>
          <li>Gather evidence (photos, witnesses, documents)</li>
          <li>Report to insurer ASAP and follow instructions</li>
          <li>Complete claim form accurately</li>
          <li>Cooperate with the adjuster</li>
          <li>Get repair estimates</li>
          <li>Review your policy</li>
          <li>Keep records of everything</li>
          <li>Review settlement; negotiate if needed</li>
          <li>Accept and repair</li>
          <li>Follow up until closed</li>
        </ol>
        <p className="text-sm text-muted-foreground">
          Key principles: Honesty • Timeliness • Documentation • Clear communication • Legal advice when appropriate
        </p>
      </section>

      <footer className="pt-4 border-t">
        <Link href="/claims" className="underline">Back to My Claims</Link>
      </footer>
    </div>
  )
}
