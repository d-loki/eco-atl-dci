-- Insérer des fausses données pour la table "quotations"
INSERT INTO quotations (customer_id, reference, type, total, created_at, send_at)
VALUES
    (1, 'REF123', 'sol', 500, '2024-01-31 08:00:00', null),
    (2, 'REF456', 'comble', 800, '2024-01-31 09:15:00', null),
    (1, 'REF789', 'sol', 1200, '2024-01-31 10:30:00', null),
    (3, 'REFABC', 'cet', 600, '2024-01-31 12:45:00', null),
    (2, 'REFDEF', 'pac_ro', 950, '2024-01-31 14:00:00', null);
