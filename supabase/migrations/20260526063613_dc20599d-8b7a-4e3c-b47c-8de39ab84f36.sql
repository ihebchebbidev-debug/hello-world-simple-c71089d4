
alter table public.quote_requests
  add constraint qr_name_len check (char_length(full_name) between 2 and 120),
  add constraint qr_email_len check (char_length(email) between 5 and 160 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  add constraint qr_phone_len check (char_length(phone) between 6 and 32),
  add constraint qr_type_len check (char_length(insurance_type) between 2 and 60),
  add constraint qr_city_len check (city is null or char_length(city) <= 80),
  add constraint qr_msg_len check (message is null or char_length(message) <= 2000),
  add constraint qr_age_range check (age is null or (age between 0 and 120));

alter table public.callback_requests
  add constraint cr_name_len check (char_length(full_name) between 2 and 120),
  add constraint cr_phone_len check (char_length(phone) between 6 and 32),
  add constraint cr_time_len check (preferred_time is null or char_length(preferred_time) <= 80);

alter table public.newsletter_subscribers
  add constraint ns_email_len check (char_length(email) between 5 and 160 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
