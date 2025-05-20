
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@Table
export class Profile extends Model<Profile> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
    })
    owner: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.STRING,
    })
    image_url: string;

    @Column({
        type: DataType.STRING
    })
    profile_name: string
}

