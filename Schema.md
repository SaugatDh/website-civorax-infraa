## System Definition

CivoraX Infra is an **Architecture & Construction company operations platform** — an internal
ERP/CRM covering client acquisition, project delivery (design → approval → construction →
handover), site documentation, vendor/contractor coordination, and staff training — with
role-based self-service portals for **Clients**, **Students**, and **Team Members**, plus a
full **Admin** panel with granular, admin-configurable, per-screen permissions.

- **Frontend**: Next.js — public marketing site only (home, services, our-work, process,
  contact/inquiry capture). No portal logic lives here.
- **Backend**: Laravel + **Filament**, 4 separate panels sharing one `users` table:
  **Admin**, **Client**, **Student**, **Team Member**.
- **Identity model**: one profile per user (`clients` OR `students` OR `team_members`) — no
  multi-role accounts. "Admin" and "Super Admin" are **Spatie roles** assigned to a
  `team_members` user, not a separate flag or table.
- **Permissions**: Spatie `laravel-permission` + Filament Shield. Admin decides, per role,
  which Filament resources/screens/actions are visible — fully data-driven, not hardcoded.
  Client and Student panels are NOT permission-customizable per user; every client/student
  sees the same screen shape, scoped to their own records only.
- **Audit**: Spatie Activitylog (`activity_log`), append-only — no soft deletes.
- **Sessions**: single active session per user, enforced across all 4 panels — logging in elsewhere force-logs-out the previous session (`users.current_session_id`).

---

### **1\. users**

Laravel's default authenticatable table. Handles authentication and login credentials.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **name** | string | User's display name |
| **email** | string, unique, nullable | Primary email address |
| **phone** | string, unique | Primary phone number |
| **password** | string | Hashed password |
| **avatar** | string, nullable | Avatar file path |
| **current\_session\_id** | string, nullable | Random token identifying the user's one active session; set on every login. A request whose session doesn't match this is force-logged-out (single active session across all 4 panels) |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **2\. otps**

Handles One-Time Passwords for password resets, login, or verification.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **user\_id** | FK \-\> users.id | User associated with the OTP |
| **code** | string | OTP code |
| **purpose** | string | Purpose: login, password\_reset, email\_verify, phone\_verify |
| **expires\_at** | datetime | Expiration date/time |
| **attempts** | integer | Failed attempt counter |
| **used\_at** | datetime, nullable | Date/time when code was consumed |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |

*(No soft deletes — OTPs are ephemeral; expired/used rows are hard-cleaned by a scheduled job.)*

### **3\. students**

Profile table for students (training/course participants). Can be self-registered or admin-created.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **user\_id** | FK \-\> users.id, unique | Auth binding |
| **fullname** | string | Student's full name |
| **dob** | date | Date of birth |
| **contact** | string | Contact phone number |
| **address** | string | Residential address |
| **academic\_qualification** | json | Frontend tag array (e.g., \["SLC", "+2", "Bachelor's"\]) — used for course eligibility |
| **created\_by** | FK \-\> users.id, nullable | null if self-registered; set if admin-created |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **4\. client\_types *(Lookup Table)***

Dynamic, admin-manageable client categories (e.g., Individual, Corporate, Government, Developer).

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **name** | string | Display name |
| **slug** | string, unique | System key |
| **description** | text, nullable | Optional details about the type |
| **is\_active** | boolean, default(true) | Enable/disable in UI without deleting |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **5\. clients**

Profile table for clients. Supports both individual and corporate clients distinctly.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **user\_id** | FK \-\> users.id, unique | Auth binding |
| **company\_name** | string, nullable | Legal company name (null for individual clients) |
| **contact\_person** | string | Person's name, or the company's primary contact person |
| **client\_type\_id** | FK \-\> client\_types.id | Dynamic lookup relation for client classification |
| **contact** | string | Primary phone/contact number |
| **address** | string | Physical address |
| **created\_by** | FK \-\> users.id, nullable | null if self-registered; set if admin-created |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **6\. team\_members**

Profile table for staff (includes Admin/Super Admin, assigned via Spatie role, not a column here). Created exclusively by admins.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **user\_id** | FK \-\> users.id, unique | Auth binding |
| **fullname** | string | Team member's full name |
| **dob** | date, nullable | Date of birth |
| **contact1** | string | Primary contact number |
| **contact2** | string, nullable | Secondary contact number |
| **designation** | string, nullable | Job title/role (e.g., Site Engineer, Architect, Surveyor) |
| **marital\_status** | string | Marital status |
| **national\_id\_path** | string | Uploaded national ID document file path |
| **bank\_name** | string | Bank name for salary/payment disbursement |
| **bank\_account\_name** | string | Account holder name |
| **bank\_account\_number** | string | Bank account number |
| **created\_by** | FK \-\> users.id | Admin who created this account |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **7\. project\_types *(Lookup Table)***

Dynamic, admin-manageable project categories (e.g., Residential, Commercial, Interior, Renovation).

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **name** | string | Display name |
| **slug** | string, unique | System key |
| **description** | text, nullable | Optional details about the type |
| **is\_active** | boolean, default(true) | Enable/disable in UI without deleting |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **8\. projects**

Stores construction/architecture project details tied to a client, with site location and total fee.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **client\_id** | FK \-\> clients.id | Associated client |
| **project\_type\_id** | FK \-\> project\_types.id | Residential/Commercial/Interior/etc. |
| **title** | string | Project title |
| **description** | text | Detailed description |
| **site\_address** | string | Physical site/plot address |
| **city** | string, nullable | City/Municipality |
| **ward\_no** | string, nullable | Ward number (local govt reference) |
| **status** | string | Status: inquiry, planning, designing, awaiting\_approval, execution, completed, on\_hold |
| **fee** | decimal | Total agreed project fee |
| **estimated\_end\_date** | date, nullable | Target completion date |
| **created\_by** | FK \-\> users.id | User who logged the project |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **9\. project\_milestones**

Planned project stages for tracking progress and milestone-based billing, separate from actual payments received.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **project\_id** | FK \-\> projects.id | Parent project |
| **title** | string | Milestone name (e.g., "Foundation", "Structure", "Finishing") |
| **sequence** | integer | Display/execution order |
| **target\_date** | date, nullable | Planned completion date |
| **completed\_at** | date, nullable | Actual completion date |
| **billing\_percent** | decimal, nullable | % of total project fee tied to this milestone |
| **status** | string | Status: pending, in\_progress, completed |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **10\. project\_documents**

Drawings, renders, and approval documents attached to a project, with basic versioning.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **project\_id** | FK \-\> projects.id | Parent project |
| **title** | string | Document name (e.g., "Floor Plan – Ground Floor") |
| **type** | string | Type: drawing, render, structural, approval\_document, other |
| **file\_path** | string | Uploaded file path |
| **version** | integer, default(1) | Version number |
| **uploaded\_by** | FK \-\> users.id | User who uploaded the document |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **11\. project\_team *(Pivot Table)***

Many-to-many relationship linking team members to projects. Composite key, hard-deleted on unassignment.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **project\_id** | FK \-\> projects.id | Target project (part of composite PK) |
| **team\_member\_id** | FK \-\> team\_members.id | Assigned team member (part of composite PK) |
| **created\_at** | timestamp | When this assignment was made |
| **updated\_at** | timestamp | Standard timestamp |

### **12\. vendors**

Contractors and material suppliers engaged for project work.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **name** | string | Contractor/supplier name or company |
| **vendor\_type** | string | Type: contractor, supplier, subcontractor |
| **contact** | string | Phone/contact number |
| **address** | string, nullable | Physical address |
| **created\_by** | FK \-\> users.id | User who added the vendor |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **13\. project\_vendors *(Pivot Table)***

Links vendors/contractors to the projects they're engaged on.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **project\_id** | FK \-\> projects.id | Target project (part of composite PK) |
| **vendor\_id** | FK \-\> vendors.id | Engaged vendor (part of composite PK) |
| **scope** | string, nullable | Scope of work (e.g., "Electrical", "Plumbing", "Cement supply") |
| **created\_at** | timestamp | When this engagement was recorded |
| **updated\_at** | timestamp | Standard timestamp |

### **14\. tasks**

Internal task assignments for project execution. Supports a lead assignee plus optional crew.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **assignee\_id** | FK \-\> team\_members.id | Lead/responsible team member |
| **project\_id** | FK \-\> projects.id, nullable | Associated project (optional) |
| **title** | string | Task title |
| **description** | text | Detailed task instructions |
| **status** | string | Status: pending, in\_progress, completed, blocked |
| **due\_at** | datetime | Target completion date/time |
| **created\_by** | FK \-\> users.id | User who logged the task |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **15\. task\_members *(Pivot Table)***

Additional crew members on a task beyond the lead assignee (e.g., site labor team).

| Column | Type | Notes |
| :---- | :---- | :---- |
| **task\_id** | FK \-\> tasks.id | Target task (part of composite PK) |
| **team\_member\_id** | FK \-\> team\_members.id | Crew member (part of composite PK) |
| **created\_at** | timestamp | Standard timestamp |

### **16\. payments**

Log of actual money received against projects.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **project\_id** | FK \-\> projects.id | Target project |
| **milestone\_id** | FK \-\> project\_milestones.id, nullable | Milestone this payment is tied to, if any |
| **amount** | decimal | Payment amount |
| **received\_at** | date | Date money was collected |
| **remark** | string, nullable | Free text notes (e.g. "2nd installment", "eSewa transfer") |
| **recorded\_by** | FK \-\> users.id | Team member or admin who logged the entry |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **17\. inquiry\_types *(Lookup Table)***

Dynamic, admin-manageable inquiry categories (e.g., Client, Student, Supplier, Contractor, Worker, Volunteer).

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **label** | string, unique | Display name |
| **slug** | string, unique | System identifier |
| **is\_active** | boolean, default(true) | Enable/disable in UI without deleting |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **18\. inquiries**

Stores lead messages and incoming inquiries from the public marketing site and other channels.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **fullname** | string | Contact person's full name |
| **address** | string, nullable | Physical address |
| **contact** | string | Phone or contact info |
| **inquiry\_type\_id** | FK \-\> inquiry\_types.id | Foreign key to inquiry\_types lookup table |
| **contact\_channel** | string | Channel source: website, email, facebook, instagram, whatsapp, etc. |
| **referred\_by** | FK \-\> users.id, nullable | Referred team member or admin |
| **message** | text | Message body |
| **status** | string | Status: new, in\_review, resolved |
| **handled\_by** | FK \-\> users.id, nullable | Team member or admin handling resolution |
| **created\_by** | FK \-\> users.id, nullable | User who logged the inquiry (null for public submissions) |
| **resolved\_at** | datetime, nullable | Resolution timestamp |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **19\. courses**

Stores training/course details offered by CivoraX Infra (e.g., CAD, site safety, design software).

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **title** | string | Course name |
| **description** | text | Course description |
| **type** | string | Delivery mode: Online, Offline, Hybrid |
| **duration** | string | Course length (e.g., "8 weeks") |
| **syllabus** | text | Content syllabus details |
| **fee** | decimal | Regular course fee (0 = free) |
| **cover\_image** | string, nullable | Cover image file path, shown on the public website |
| **discount\_fee** | decimal, nullable | Sale price; if set below `fee`, website shows `fee` struck through |
| **status** | string | Publication status: draft, published, archived — only `published` shows on the public website |
| **created\_by** | FK \-\> users.id | Creator of the course record |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **20\. class\_sessions**

Represents single scheduled course meeting occurrences.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **course\_id** | FK \-\> courses.id | Parent course |
| **starts\_at** | datetime | Session start time |
| **ends\_at** | datetime | Session end time |
| **status** | string | Status: scheduled, completed, cancelled |
| **meeting\_url** | string, nullable | Online class link |
| **recording\_url** | string, nullable | Recorded session link |
| **note** | text, nullable | Additional meeting notes |
| **created\_by** | FK \-\> users.id | User who created the session schedule |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **21\. enrollments**

Tracks student enrollments into courses.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **course\_id** | FK \-\> courses.id | Enrolled course |
| **student\_id** | FK \-\> students.id | Enrolled student |
| **enrolled\_at** | date | Date student was enrolled |
| **created\_by** | FK \-\> users.id | Team member or admin who performed enrollment |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **22\. course\_payments**

Log of actual money received against a student's course enrollment (separate from project `payments`).

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **enrollment\_id** | FK \-\> enrollments.id | Target enrollment |
| **amount** | decimal | Payment amount |
| **received\_at** | date | Date money was collected |
| **remark** | string, nullable | Free text notes |
| **recorded\_by** | FK \-\> users.id | Team member or admin who logged the entry |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **23\. course\_payment\_submissions**

Student-submitted payment claims (QR/eSewa/Khalti transfer + reference, awaiting staff review), separate from the verified `course_payments` ledger. Approving one creates the matching `course_payments` row.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **enrollment\_id** | FK \-\> enrollments.id | Target enrollment |
| **amount** | decimal | Amount the student claims to have paid |
| **transaction\_reference** | string | Transaction ID / reference from the student's payment app |
| **screenshot\_path** | string, nullable | Optional uploaded payment screenshot |
| **status** | string | pending, approved, rejected |
| **reviewed\_by** | FK \-\> users.id, nullable | Team member or admin who reviewed it |
| **reviewed\_at** | datetime, nullable | Review timestamp |
| **review\_note** | text, nullable | Reviewer's note (required on rejection) |
| **created\_at** | timestamp | Submission timestamp |
| **updated\_at** | timestamp | Standard timestamp |
| **deleted\_at** | timestamp, nullable | Soft delete support |

### **24\. payment\_settings *(Singleton Table)***

Single-row table (id \= 1) holding the company's payment QR code and instructions, shown to students on the "Make Payment" screen. Managed by Super Admin only.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Always 1 |
| **qr\_image\_path** | string, nullable | Uploaded QR code image (eSewa/Khalti/bank) |
| **instructions** | text, nullable | Free text payment instructions shown alongside the QR |
| **created\_at** | timestamp | Standard timestamp |
| **updated\_at** | timestamp | Standard timestamp |

### **25\. activity\_log *(Shared Table)***

Single shared, append-only audit log across all models (Spatie Activitylog architecture). No soft deletes — audit trail is immutable.

| Column | Type | Notes |
| :---- | :---- | :---- |
| **id** | PK | Primary Key |
| **log\_name** | string, nullable | Category/log bucket |
| **description** | text | Performed action (created, updated, deleted, restored) |
| **subject\_type** | string, nullable | Target model class name |
| **subject\_id** | unsignedBigInteger, nullable | Target record ID |
| **causer\_type** | string, nullable | Performing model class (usually User) |
| **causer\_id** | unsignedBigInteger, nullable | Performing user ID |
| **properties** | json, nullable | Stores old and new field attributes |
| **created\_at** | timestamp | Log timestamp |
| **updated\_at** | timestamp | Log timestamp |

### **Permission tables *(Spatie laravel-permission — package-managed)***

Not hand-designed; installed via `spatie/laravel-permission` + Filament Shield. Drives the
Admin panel's per-role, per-screen access control (e.g. "Junior Staff" role can view tasks but
not payments).

- **roles** — admin-defined roles (e.g. Super Admin, Administrator, Site Engineer, Junior Staff)
- **permissions** — auto-generated per Filament resource/page/action (e.g. `view_any_payment`, `delete_task`)
- **model\_has\_roles** — links `users` to `roles`
- **model\_has\_permissions** — direct user-level permission overrides (rarely used)
- **role\_has\_permissions** — links `roles` to `permissions`

---

### Notes on portal scoping

- **Client panel**: sees only their own `projects`, `project_milestones`, `project_documents`, `payments`. No per-client custom permissions.
- **Student panel**: sees only their own `enrollments`, related `courses`, `class_sessions`, `course_payments` (fee, amount paid, balance due), and their own `course_payment_submissions` history. Can self-enroll in a `published` course and submit a payment claim (QR shown from `payment_settings`) for staff to verify. No per-student custom permissions.
- **Team Member panel**: sees `tasks`/`projects` per Spatie role+permission assignment, set by Admin per screen.
- **Admin panel**: full access; Super Admin role bypasses all permission checks (Filament Shield super-admin convention).
