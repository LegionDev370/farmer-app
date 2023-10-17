import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SpecialityModule } from './speciality/speciality.module';
import { WorkerModule } from './worker/worker.module';
import { BlocksModule } from './blocks/blocks.module';
import { WorkerBlockModule } from './worker_block/worker_block.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { AnimalsModule } from './animals/animals.module';
import { AnimalTypeModule } from './animal-type/animal-type.module';
import { VaccinationHistoryModule } from './vaccination_history/vaccination_history.module';
import { MeatProductionModule } from './meat_production/meat_production.module';
import { FiberProductionModule } from './fiber_production/fiber_production.module';
import { MilkProductionModule } from './milk_production/milk_production.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AdminModule,
    SpecialityModule,
    WorkerModule,
    BlocksModule,
    WorkerBlockModule,
    VaccineModule,
    AnimalsModule,
    AnimalTypeModule,
    VaccinationHistoryModule,
    MeatProductionModule,
    FiberProductionModule,
    MilkProductionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
