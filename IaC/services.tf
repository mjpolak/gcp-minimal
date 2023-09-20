resource "google_project_service" "resources_manager" {
  service = "cloudresourcemanager.googleapis.com"
}

resource "google_project_service" "artifactregistry" {
  service = "artifactregistry.googleapis.com"
}

resource "google_project_service" "firestore" {
  service = "firestore.googleapis.com"
  depends_on = [google_project_service.resources_manager]
}

resource "google_project_service" "cloudrun" {
  service = "run.googleapis.com"
}


resource "google_project_service" "iam" {
  service = "iam.googleapis.com"
}