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
  @Input() memberId: string | undefined;
  @Input() opened = false;

  // OUTPUTS
  @Output() onCloseModal = new EventEmitter<void>();

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    if (this.memberId) {
      this.member = this.membersService.getMember(this.memberId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.memberId) {
      this.member = this.membersService.getMember(this.memberId);
    }
  }

  // MAIN METHODS
  deleteMember() {
    this.membersService.deleteMember(this.member.id);
    this.onCloseModal.emit();
  }
}
