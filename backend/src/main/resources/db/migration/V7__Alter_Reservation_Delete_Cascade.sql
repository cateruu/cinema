ALTER TABLE reservations
DROP CONSTRAINT IF EXISTS fkb5g9io5h54iwl2inkno50ppln,
DROP CONSTRAINT IF EXISTS fktf0cg528lcyk7x787m1b3o4i8;

ALTER TABLE reservations
ADD CONSTRAINT fk_reservations_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
ADD CONSTRAINT fk_reservations_schedule
    FOREIGN KEY (schedule_id)
    REFERENCES schedule(id)
    ON DELETE CASCADE;