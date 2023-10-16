import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { NOTFOUND } from 'dns';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const findAdmin = await this.adminModel.findOne({
      email: createAdminDto.email,
    });
    if (!findAdmin) {
      const { password, confirm_password } = createAdminDto;
      if (password !== confirm_password) {
        throw new BadRequestException('password is incorrect');
      }
      const hashed_password = await bcrypt.hash(password, 10);
      const createdAdmin = await this.adminModel.create({
        ...createAdminDto,
        hashed_password,
      });
      const tokens = await this.generateToken(createdAdmin);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);
      const updateAdmin = await this.adminModel.findByIdAndUpdate(
        createdAdmin._id,
        {
          hashed_refresh_token,
        },
        { new: true },
      );
      return {
        message: 'admin created successfully',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        admin: updateAdmin,
      };
    }
    throw new HttpException('admin already exists', HttpStatus.UNAUTHORIZED);
  }

  async findAll() {
    const admins = await this.adminModel.find();
    if (admins.length >= 1) {
      return admins;
    }
    throw new HttpException('admins not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findById(id);
    if (admin) {
      return admin;
    }
    throw new HttpException('admin not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const existingAdmin = await this.adminModel.findByIdAndUpdate(
      id,
      updateAdminDto,
      {
        new: true,
      },
    );
    if (!existingAdmin) {
      throw new HttpException('admin not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Admin updated successfully',
    };
  }

  async remove(id: string) {
    const data = await this.adminModel.deleteOne(
      { _id: id },
      {
        new: true,
      },
    );
    console.log(data.deletedCount);
    if (data.deletedCount) {
      return {
        message: 'admin deleted successfully',
      };
    } else {
      throw new HttpException('admin not found', HttpStatus.NOT_FOUND);
    }
  }

  async generateToken(admin: AdminDocument) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    const response = {
      access_token,
      refresh_token,
    };
    return response;
  }
}
