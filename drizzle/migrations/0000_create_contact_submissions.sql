CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  business_name text,
  selected_package text,
  project_type text,
  project_description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Server code (service role) only; no anon or authenticated access.
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
-- No policies: anonymous visitors and regular users cannot read, update or delete submissions.