ALTER TABLE schedule
DROP CONSTRAINT IF EXISTS fk7tq1xwrwg75e8oexk7b6tq012,
DROP CONSTRAINT IF EXISTS fklx67nrxi4kd6mpx4i1v4vl7c3;

ALTER TABLE schedule
ADD CONSTRAINT fk_schedule_room
    FOREIGN KEY (room_id)
    REFERENCES rooms(id)
    ON DELETE CASCADE,
ADD CONSTRAINT fk_schedule_movie
    FOREIGN KEY (movie_id)
    REFERENCES movies(id)
    ON DELETE CASCADE;