resource "google_artifact_registry_repository" "birthday" {
  repository_id = "birthday"
  format        = "DOCKER"
  location      = var.location

  depends_on = [google_project_service.artifactregistry]
}