import { AbstractControl } from '@angular/forms';

export abstract class UploadFileClass {
  uploadFile(event: Event, control: AbstractControl) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener('load', () => {
        control.setValue(reader.result);
      });

      reader.addEventListener('error', () => {
        console.error(reader.error);
      });
    }
  }
}
