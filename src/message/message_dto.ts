export class MessageDto {
    userId?: string;
    contactId?: string;
    groupId?: string;
    msg_box:{text:string,to:string};
    deliver_at?: string;
    delete_for_me?: string;
    delete_for_everyone?: string;
    seen_by?: {
        userId: string;
        date_and_time: string;
    };
}