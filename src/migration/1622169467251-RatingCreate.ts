import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class RatingCreate1622169467251 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ratings',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true
          },
          {
            name: 'profile',
            type: 'uuid'
          },
          {
            name: 'movie',
            type: 'varchar'
          },
          {
            name: 'movieUtitle',
            type: 'varchar'
          },
          {
            name: 'range',
            type: 'int'
          }
        ]
      })
    );
    await queryRunner.createForeignKeys(
      'ratings',
      [
        new TableForeignKey({
          referencedColumnNames: ['id'],
          columnNames: ['profile'],
          referencedTableName: 'profiles'
        }),
        new TableForeignKey({
          referencedColumnNames: ['utitle'],
          columnNames: ['movie'],
          referencedTableName: 'movies'
        })
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('ratings');
  }

}
