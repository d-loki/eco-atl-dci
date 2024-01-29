export type CorrectionRequest = {
    comment: string;
    is_client: boolean;
    closed_at?: Date;
    created_at: Date;
};
