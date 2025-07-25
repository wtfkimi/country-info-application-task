import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1753463369670 implements MigrationInterface {
  name = 'Migrations1753463369670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`calendar_event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`country\` varchar(2) NOT NULL, \`event\` varchar(255) NOT NULL, \`calendar_id\` int NOT NULL, UNIQUE INDEX \`IDX_8c9087842af94776a6a1b85770\` (\`event\`, \`calendar_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`calendar\` (\`id\` int NOT NULL AUTO_INCREMENT, \`year\` int NOT NULL, \`user_id\` int NOT NULL, UNIQUE INDEX \`IDX_6daae87ca61852ca6354932b90\` (\`year\`, \`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`calendar_event\` ADD CONSTRAINT \`FK_b8a97d25d9efe9b656b960f8b3a\` FOREIGN KEY (\`calendar_id\`) REFERENCES \`calendar\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`calendar\` ADD CONSTRAINT \`FK_e19fb6bccd41688d5956652baf5\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`calendar\` DROP FOREIGN KEY \`FK_e19fb6bccd41688d5956652baf5\``);
    await queryRunner.query(`ALTER TABLE \`calendar_event\` DROP FOREIGN KEY \`FK_b8a97d25d9efe9b656b960f8b3a\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP INDEX \`IDX_6daae87ca61852ca6354932b90\` ON \`calendar\``);
    await queryRunner.query(`DROP TABLE \`calendar\``);
    await queryRunner.query(`DROP INDEX \`IDX_8c9087842af94776a6a1b85770\` ON \`calendar_event\``);
    await queryRunner.query(`DROP TABLE \`calendar_event\``);
  }
}
