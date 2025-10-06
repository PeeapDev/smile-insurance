-- Enable required extensions for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'members' table
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(50),
    phone_number VARCHAR(50),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    employment_status VARCHAR(50),
    company_name VARCHAR(255),
    job_title VARCHAR(255),
    has_pre_existing_conditions BOOLEAN DEFAULT FALSE,
    medical_history_notes TEXT,
    user_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'insurance_cards' table (now linked to members)
CREATE TABLE IF NOT EXISTS insurance_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES members(id),
    card_number VARCHAR(255) UNIQUE NOT NULL,
    member_name VARCHAR(255) NOT NULL,
    policy_number VARCHAR(255) NOT NULL,
    group_number VARCHAR(255),
    effective_date DATE NOT NULL,
    expiration_date DATE NOT NULL,
    plan_type VARCHAR(100),
    issuer VARCHAR(255),
    design_url TEXT,
    delivery_method VARCHAR(50),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'dependents' table
CREATE TABLE IF NOT EXISTS dependents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID NOT NULL REFERENCES insurance_cards(id),
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'card_addons' table (many-to-many relationship for add-ons)
CREATE TABLE IF NOT EXISTS card_addons (
    card_id UUID NOT NULL REFERENCES insurance_cards(id),
    addon_id VARCHAR(50) NOT NULL, -- e.g., 'vision', 'dental'
    PRIMARY KEY (card_id, addon_id)
);

-- Create the 'documents' table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES members(id),
    dependent_id UUID REFERENCES dependents(id),
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_url TEXT NOT NULL, -- URL to the stored document (e.g., S3, Vercel Blob)
    document_type VARCHAR(100), -- e.g., 'id_proof', 'address_proof', 'medical_record', 'birth_certificate'
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'chat_messages' table (messages within conversations)
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL, -- can be a member or admin user id (store raw UUID)
    sender_role VARCHAR(50) NOT NULL CHECK (sender_role IN ('user','admin','company')),
    content TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'conversations' table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES members(id), -- If conversation is initiated by a member
    admin_id UUID, -- If an admin is involved
    company_id UUID, -- If a company admin is involved
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'closed', 'pending'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES members(id),
    claim_number VARCHAR(255) UNIQUE NOT NULL,
    claim_date DATE,
    service_date DATE NOT NULL,
    provider_name VARCHAR(255) NOT NULL,
    description TEXT,
    amount_billed DECIMAL(10, 2) NOT NULL,
    amount_paid DECIMAL(10, 2),
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'payments' table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES members(id),
    invoice_id VARCHAR(255), -- Reference to an invoice if applicable
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_method VARCHAR(50), -- 'credit_card', 'bank_transfer', 'paypal'
    transaction_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID NOT NULL,
    recipient_role VARCHAR(50) NOT NULL CHECK (recipient_role IN ('user','admin','company')),
    type VARCHAR(100),
    title VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'providers' table
CREATE TABLE IF NOT EXISTS providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- e.g., 'hospital', 'clinic', 'doctor', 'pharmacy'
    specialty VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    phone_number VARCHAR(50),
    email VARCHAR(255),
    website TEXT,
    is_in_network BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'admin_users' table (for internal admin roles)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'support', -- 'support', 'claims_manager', 'super_admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'companies' table (for company accounts)
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(50),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    contact_person_name VARCHAR(255),
    contact_person_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key to members table for company_id
ALTER TABLE members
ADD COLUMN company_id UUID REFERENCES companies(id);

-- Add foreign key to insurance_cards for company_id (if cards are tied to companies directly)
ALTER TABLE insurance_cards
ADD COLUMN company_id UUID REFERENCES companies(id);

-- No direct FKs for chat_messages sender_id since it can reference multiple roles

-- Add foreign key to conversations for member_id, admin_id, company_id
ALTER TABLE conversations
ADD CONSTRAINT fk_member_conversation
FOREIGN KEY (member_id)
REFERENCES members(id);

ALTER TABLE conversations
ADD CONSTRAINT fk_admin_conversation
FOREIGN KEY (admin_id)
REFERENCES admin_users(id);

ALTER TABLE conversations
ADD CONSTRAINT fk_company_conversation
FOREIGN KEY (company_id)
REFERENCES companies(id);

-- Notifications use recipient_id and recipient_role; no strict FK for flexibility

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_insurance_cards_member_id ON insurance_cards(member_id);
CREATE INDEX idx_insurance_cards_card_number ON insurance_cards(card_number);
CREATE INDEX idx_claims_member_id ON claims(member_id);
CREATE INDEX idx_claims_status ON claims(status);
CREATE INDEX idx_payments_member_id ON payments(member_id);
CREATE INDEX idx_notifications_recipient_id ON notifications(recipient_id);
CREATE INDEX idx_providers_type ON providers(type);
CREATE INDEX idx_providers_specialty ON providers(specialty);
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_companies_email ON companies(email);
CREATE INDEX idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_sender_id ON chat_messages(sender_id);
CREATE INDEX idx_conversations_member_id ON conversations(member_id);
CREATE INDEX idx_conversations_admin_id ON conversations(admin_id);
CREATE INDEX idx_conversations_company_id ON conversations(company_id);
