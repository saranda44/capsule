variable "aws_profile" {
  description = "AWS CLI profile to use"
  type        = string
  default     = "academy"
}

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name prefix used to tag resources"
  type        = string
  default     = "lab1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Name of an existing EC2 key pair used for SSH access"
  type        = string
  default     = "vockey"
}

variable "ssh_allowed_cidr" {
  description = "CIDR block allowed to SSH into the instance"
  type        = string
  default     = "148.201.223.136/32"
}
