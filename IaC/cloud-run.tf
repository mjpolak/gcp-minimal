resource "google_cloud_run_v2_service" "birthday" {
  name     = "birthday"
  location = var.location
  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "gcr.io/cloudrun/placeholder"
    }

    scaling {
      max_instance_count = 1
      min_instance_count = 0
    }
  }
  depends_on = [google_project_service.cloudrun]
}

resource "google_cloud_run_service_iam_member" "public" {
  location = google_cloud_run_v2_service.birthday.location
  project  = google_cloud_run_v2_service.birthday.project
  service  = google_cloud_run_v2_service.birthday.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}