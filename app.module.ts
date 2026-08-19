import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// Modules will be added here as we implement them
// import { CustomersModule } from './modules/customers/customers.module';
// import { InvoicesModule } from './modules/invoices/invoices.module';
// etc.

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    // Future modules:
    // CustomersModule,
    // CustomerGroupsModule,
    // InvoicesModule,
    // InstallmentsModule,
    // PaymentsModule,
    // ActivityLogsModule,
    // ReportsModule,
    // ImportExportModule,
    // SettingsModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
