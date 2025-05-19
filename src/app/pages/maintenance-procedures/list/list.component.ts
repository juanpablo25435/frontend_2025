import { Component, OnInit } from "@angular/core";
import { MaintenanceProcedure } from "src/app/models/maintenance-procedure.model";
import { Router } from "@angular/router";
import { MaintenanceProcedureService } from "src/app/services/maintenance-procedure.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  maintenanceProcedures: MaintenanceProcedure[] = [];

  constructor(
    private maintenanceProcedureService: MaintenanceProcedureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.maintenanceProcedureService.list().subscribe({
      next: (maintenanceProcedures) => {
        this.maintenanceProcedures = maintenanceProcedures;
        console.log(
          "Maintenance Procedures fetched successfully:",
          this.maintenanceProcedures
        );
      },
      error: (error) => {
        console.error("Error fetching maintenance procedures:", error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(["/maintenance-procedures/view", id]);
  }

  edit(id: number) {
    this.router.navigate(["/maintenance-procedures/update", id]);
  }

  create() {
    this.router.navigate(["/maintenance-procedures/create"]);
  }

  delete(id: number) {
    console.log("Delete maintenance procedure with id:", id);
    Swal.fire({
      title: "Eliminar",
      text: "¿Está seguro que quiere eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.maintenanceProcedureService.delete(id).subscribe({
          next: (data) => {
            Swal.fire(
              "¡Eliminado!",
              "Registro eliminado correctamente.",
              "success"
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              "Error",
              "No se pudo eliminar el procedimiento de mantenimiento: " +
                error.message,
              "error"
            );
          },
        });
      }
    });
  }
}
