variable "project_id" {
  description = "Project ID"
  type        = string
}


variable "region" {
  type = string
  default = "europe-central2-a"
}

variable "location" {
  type = string
  default = "europe-central2"
}

variable "github_owner" {
  type = string
}

variable "github_repo" {
  type = string
}