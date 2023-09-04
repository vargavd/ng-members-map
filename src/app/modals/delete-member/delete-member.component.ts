import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.scss']
})
export class DeleteMemberComponent implements OnInit, OnChanges {
  member: Member;

  // INPUTS
  @Input() memberIndex: number;
  @Input() opened = false;

  // OUTPUTS
  @Output() onCloseModal = new EventEmitter<void>();

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    if (this.memberIndex) {
      this.member = this.membersService.getMember(this.memberIndex);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.memberIndex) {
      this.member = this.membersService.getMember(this.memberIndex);
    }
  }

  // MAIN METHODS
  deleteMember() {
    this.membersService.deleteMember(this.memberIndex);
    this.onCloseModal.emit();
  }
}
