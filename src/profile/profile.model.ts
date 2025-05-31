
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@Table
export class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: CreationOptional<number>;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
    })
    owner: number;

    @BelongsTo(() => User)
    declare user: CreationOptional<User>;


    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    image_url: string | null;

    @Column({
        type: DataType.STRING
    })
    profile_name: string
}

