import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
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

  // LIFECYCLES
  ngOnInit(): void {
    if (this.memberId) {
      this.getMember();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.memberId) {
      this.getMember();
    }
  }

  // MAIN METHODS
  getMember() {
    this.membersService.filteredMembers.pipe(take(1)).subscribe({
      next: members => {
        this.member = members.find(member => member.id === this.memberId);
      },
      error: error => console.error(error),
    });
  }
  deleteMember() {
    this.membersService.deleteMember(this.member.id);
    this.onCloseModal.emit();
  }
}
