import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MetodosPago } from '../../../models/MetodosPago';
import { MetodospagoService } from '../../../services/metodospago.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listarmetodospago',
  standalone: true,
  imports: [MatTableModule,MatIconModule, MatPaginator,MatButtonModule,RouterModule],
  templateUrl: './listarmetodospago.component.html',
  styleUrl: './listarmetodospago.component.css'
})
export class ListarmetodospagoComponent implements OnInit{
  dataSource: MatTableDataSource<MetodosPago> = new MatTableDataSource();
  totalItems: number = 0;//Manejar la cantidad
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'accion01',
    'accion02',
  ];
  constructor(private mS: MetodospagoService) {}
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  ngOnInit(): void {

    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//agregado
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;//agregado
    });
  }
  eliminar(id: number) {
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    });
  }
}
