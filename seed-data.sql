-- Seed users (for linking to members)
INSERT INTO users (email, password_hash, role) VALUES
('admin@example.com', 'hashed_password_admin', 'admin'),
('user@example.com', 'hashed_password_user', 'user'),
('company@example.com', 'hashed_password_company', 'company')
ON CONFLICT (email) DO NOTHING;

-- Seed data for 'members' table (link each member to a user)
INSERT INTO members (full_name, email, password_hash, date_of_birth, gender, phone_number, address, city, state, zip_code, employment_status, company_name, job_title, has_pre_existing_conditions, user_id) VALUES
('John Doe', 'john.doe@example.com', 'hashed_password_1', '1980-05-15', 'male', '+1-555-111-2222', '123 Main St', 'Anytown', 'CA', '90210', 'employed', 'Tech Solutions Inc', 'Software Engineer', FALSE, (SELECT id FROM users WHERE email = 'user@example.com')),
('Jane Smith', 'jane.smith@example.com', 'hashed_password_2', '1992-11-22', 'female', '+1-555-333-4444', '456 Oak Ave', 'Otherville', 'NY', '10001', 'self-employed', NULL, NULL, TRUE, (SELECT id FROM users WHERE email = 'user@example.com')),
('Alice Johnson', 'alice.j@example.com', 'hashed_password_3', '1975-03-10', 'female', '+1-555-555-6666', '789 Pine Ln', 'Villageton', 'TX', '75001', 'employed', 'Healthcare Corp', 'HR Manager', FALSE, (SELECT id FROM users WHERE email = 'user@example.com'))
ON CONFLICT (email) DO NOTHING;

-- Seed data for 'admin_users' table
INSERT INTO admin_users (full_name, email, password_hash, role) VALUES
('Admin User', 'admin@smile.com', 'admin_hashed_password', 'super_admin'),
('Support Agent', 'support@smile.com', 'support_hashed_password', 'support');

-- Seed data for 'companies' table
INSERT INTO companies (name, email, phone_number, address, city, state, zip_code, contact_person_name, contact_person_email) VALUES
('Tech Solutions Inc', 'contact@techsolutions.com', '+1-800-TECH-SOL', '100 Tech Park', 'Silicon Valley', 'CA', '94025', 'CEO Tech', 'ceo@techsolutions.com'),
('Healthcare Corp', 'info@healthcarecorp.com', '+1-800-HEALTH-CO', '200 Medical Plaza', 'Health City', 'NY', '10002', 'HR Health', 'hr@healthcarecorp.com');

-- Update members with company_id
UPDATE members SET company_id = (SELECT id FROM companies WHERE name = 'Tech Solutions Inc') WHERE email = 'john.doe@example.com';
UPDATE members SET company_id = (SELECT id FROM companies WHERE name = 'Healthcare Corp') WHERE email = 'alice.j@example.com';

-- Seed data for 'insurance_cards' table (aligned to normalized schema)
INSERT INTO insurance_cards (member_id, card_number, member_name, policy_number, group_number, effective_date, expiration_date, plan_type, issuer, design_url, delivery_method, emergency_contact_name, emergency_contact_phone, company_id) VALUES
((SELECT id FROM members WHERE email = 'john.doe@example.com'), 'SIM001423', 'John Doe', 'POL001', 'GRP-A', '2024-01-01', '2024-12-31', 'standard', 'SMILE Insurance', NULL, 'digital', 'Jane Doe', '+1-555-111-2223', (SELECT id FROM companies WHERE name = 'Tech Solutions Inc')),
((SELECT id FROM members WHERE email = 'jane.smith@example.com'), 'SIM001424', 'Jane Smith', 'POL002', 'GRP-B', '2024-01-15', '2024-12-31', 'premium', 'SMILE Insurance', NULL, 'both', 'John Smith Sr.', '+1-555-333-4445', NULL),
((SELECT id FROM members WHERE email = 'alice.j@example.com'), 'SIM001425', 'Alice Johnson', 'POL003', 'GRP-C', '2024-02-01', '2024-12-31', 'basic', 'SMILE Insurance', NULL, 'digital', 'Bob Johnson', '+1-555-555-6667', (SELECT id FROM companies WHERE name = 'Healthcare Corp'))
ON CONFLICT (card_number) DO NOTHING;

INSERT INTO dependents (card_id, name, age, relationship) VALUES
((SELECT id FROM insurance_cards WHERE card_number = 'SIM001423'), 'Jimmy Doe', 12, 'child'),
((SELECT id FROM insurance_cards WHERE card_number = 'SIM001423'), 'Jane Doe', 38, 'spouse'),
((SELECT id FROM insurance_cards WHERE card_number = 'SIM001424'), 'Emily Smith', 5, 'child');

INSERT INTO card_addons (card_id, addon_id) VALUES
((SELECT id FROM insurance_cards WHERE card_number = 'SIM001423'), 'dental'),
((SELECT id FROM insurance_cards WHERE card_number = 'SIM001423'), 'vision'),
((SELECT id FROM insurance_cards WHERE card_number = 'SIM001424'), 'critical');

INSERT INTO conversations (member_id, status) VALUES
((SELECT id FROM members WHERE email = 'john.doe@example.com'), 'open');

INSERT INTO chat_messages (conversation_id, sender_id, sender_role, content) VALUES
((SELECT id FROM conversations WHERE member_id = (SELECT id FROM members WHERE email = 'john.doe@example.com')), (SELECT id FROM members WHERE email = 'john.doe@example.com'), 'user', 'Hi, I have a question about my coverage.'),
((SELECT id FROM conversations WHERE member_id = (SELECT id FROM members WHERE email = 'john.doe@example.com')), (SELECT id FROM admin_users WHERE email = 'support@smile.com'), 'admin', 'Hello John, how can I assist you today?');

INSERT INTO claims (member_id, claim_number, claim_date, service_date, provider_name, description, amount_billed, status) VALUES
((SELECT id FROM members WHERE email = 'john.doe@example.com'), 'CLM001', '2024-02-10', '2024-02-05', 'City Hospital', 'Emergency Room Visit', 1500.00, 'pending'),
((SELECT id FROM members WHERE email = 'jane.smith@example.com'), 'CLM002', '2024-03-01', '2024-02-20', 'Dr. Green Clinic', 'Annual Checkup', 250.00, 'approved')
ON CONFLICT (claim_number) DO NOTHING;

INSERT INTO payments (member_id, amount, payment_method, transaction_id, status) VALUES
((SELECT id FROM members WHERE email = 'john.doe@example.com'), 149.00, 'credit_card', 'TXN12345', 'completed'),
((SELECT id FROM members WHERE email = 'jane.smith@example.com'), 249.00, 'paypal', 'TXN67890', 'completed');

INSERT INTO notifications (recipient_id, recipient_role, type, title, message, is_read, link) VALUES
((SELECT id FROM members WHERE email = 'john.doe@example.com'), 'user', 'claim_update', 'Claim CLM001 Update', 'Your claim CLM001 is currently being processed.', FALSE, '/user/claims/CLM001'),
((SELECT id FROM members WHERE email = 'jane.smith@example.com'), 'user', 'payment_due', 'Premium Payment Due', 'Your monthly premium of $249 is due on 2024-04-01.', FALSE, '/user/billing'),
((SELECT id FROM admin_users WHERE email = 'admin@smile.com'), 'admin', 'new_registration', 'New Member Registered', 'A new member, Jane Smith, has registered.', FALSE, '/admin/members');

-- Seed data for 'providers' table
INSERT INTO providers (name, type, specialty, address, city, state, zip_code, phone_number, email, website, is_in_network) VALUES
('City Hospital', 'hospital', 'General', '1000 Hospital Way', 'Anytown', 'CA', '90210', '+1-555-999-8888', 'info@cityhospital.com', 'http://cityhospital.com', TRUE),
('Dr. Green Clinic', 'clinic', 'Family Medicine', '500 Health Blvd', 'Otherville', 'NY', '10001', '+1-555-777-6666', 'info@drgreenclinic.com', 'http://drgreenclinic.com', TRUE),
('MediCare Pharmacy', 'pharmacy', NULL, '200 Drug Rd', 'Villageton', 'TX', '75001', '+1-555-444-3333', 'info@medicarepharmacy.com', 'http://medicarepharmacy.com', TRUE),
('Specialty Surgeons', 'doctor', 'Surgery', '300 Surgery St', 'Anytown', 'CA', '90210', '+1-555-222-1111', 'info@specialtysurgeons.com', 'http://specialtysurgeons.com', FALSE);

-- Users already seeded at top

-- Additional sample card (linked to John Doe)
INSERT INTO insurance_cards (member_id, card_number, member_name, policy_number, group_number, effective_date, expiration_date, plan_type, issuer, design_url, delivery_method, emergency_contact_name, emergency_contact_phone)
SELECT m.id, 'SIMC1234567890', 'John Doe', 'POL987654321', 'GRP123', '2024-01-01', '2025-12-31', 'standard', 'SMILE Insurance', 'https://example.com/card-design-1.png', 'email', 'Jane Doe', '555-123-4567'
FROM members m WHERE m.email = 'john.doe@example.com'
ON CONFLICT (card_number) DO NOTHING;

-- Additional sample claims for John (member-based)
INSERT INTO claims (member_id, claim_number, service_date, provider_name, description, amount_billed, status)
SELECT m.id, 'CLM2024001', '2024-03-10', 'City Hospital', 'Emergency Room Visit', 1500.00, 'pending'
FROM members m WHERE m.email = 'john.doe@example.com'
ON CONFLICT (claim_number) DO NOTHING;

INSERT INTO claims (member_id, claim_number, service_date, provider_name, description, amount_billed, status)
SELECT m.id, 'CLM2024002', '2024-02-15', 'Dr. Smith Clinic', 'Annual Check-up', 250.00, 'approved'
FROM members m WHERE m.email = 'john.doe@example.com'
ON CONFLICT (claim_number) DO NOTHING;

-- Replaced by chat_messages above

-- Covered by new notifications format above
