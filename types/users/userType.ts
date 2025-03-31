export interface UserType {
    id: number
    name: string
    telegram_username: string
    tg_chat_id: number
    // meta?: EmployeeMeta[]
    // leads?: any[]
    // is_manager: boolean | 1 | 0
    is_active: boolean;
    is_boss: boolean | 1 | 0
}

// id INT PRIMARY KEY AUTO_INCREMENT,
// created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
// is_active boolean DEFAULT 1,
// name varchar(255) UNIQUE,
// telegram_username  varchar(255) NOT NULL UNIQUE,
// tg_chat_id varchar(255) DEFAULT NULL UNIQUE,
// is_boss boolean DEFAULT 0