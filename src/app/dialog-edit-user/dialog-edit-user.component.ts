// Unverständlich
function function1(arg1, arg2) {
  console.log('Aboniere ' + arg1);
}


// Viiiel besser ;-)
function help(channel) {
  console.log('Aboniere ' + channel);
}

// Kannst du diese Funktion verstehen?
help('diesen Channel');








@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  user: User;
  userId: string;
  loading = false;
  birthDate: Date;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.loading = true;
    this.firestore
      .collection('users')
      .doc(this.userId)
      .update(this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });
  }





}
