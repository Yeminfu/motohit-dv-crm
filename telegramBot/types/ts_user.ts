export interface t_user {
    id: number;
    name: string;
    telegram_username: string;
    tg_chat_id: number;
    // meta?: EmployeeMeta[]
    // leads?: any[]
    // is_manager: boolean | 1 | 0
    // is_active: boolean | 1 | 0
    is_boss: boolean | 1 | 0;
  }