import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cloud-sync',
  templateUrl: './cloud-sync.component.html',
  styleUrls: ['./cloud-sync.component.css']
})
export class CloudSyncComponent implements OnInit {

  constructor(private toastr: ToastrService) {
    
  }

  ngOnInit(): void {
    
  }

}
