import { NextResponse } from "next/server"

// Interim API to provide mock signed-in user profile
// Swap this later to read from your real auth/session + DB
export async function GET() {
  const user = {
    id: "user_12345",
    name: "John Smith",
    email: "john.smith@example.com",
  }

  const insuranceProfile = {
    memberName: user.name,
    memberId: "SIA123456789",
    groupNumber: "GRP001234",
    policyNumber: "POL-2024-001234",
    planName: "Premium Health Plus",
    effectiveDate: "01/01/2024",
    expirationDate: "12/31/2024",
    issueDate: "12/15/2023",
    cardType: "Digital & Physical",
  }

  return NextResponse.json({ user, insuranceProfile })
}
