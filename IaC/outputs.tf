output "app_url" {
  value = google_cloud_run_v2_service.birthday.uri
}

output "wif_provider_id" {
  value = google_iam_workload_identity_pool_provider.github.id
  sensitive = true
}

output "wif_service_account_email" {
  value = google_service_account.github.email
  sensitive = true
}