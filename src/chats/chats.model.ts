import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { chatType } from './chats.interface';

@Table
export class Chat extends Model<Chat, chatType> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    chat_id: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_group_chat: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    group_admin: number

    @Column({
        type: DataType.ARRAY(DataType.INTEGER),
        validate: {
            notEmptyArray(value: number[]) {
                if (!Array.isArray(value) || value.length === 0) {
                    throw new Error('chat must contain at least one participant');
                }
            },
        },
    })
    participants_id: number[];
}
