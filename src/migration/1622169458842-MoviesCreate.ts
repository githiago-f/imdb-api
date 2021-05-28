import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class MoviesCreate1622169458842 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'utitle',
            type: 'varchar',
            isUnique: true,
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            type: 'varchar',
            name: 'genre'
          },
          {
            name: 'director',
            type: 'varchar'
          },
          {
            name: 'actors',
            type: 'varchar',
            isArray: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('movies');
  }

}
