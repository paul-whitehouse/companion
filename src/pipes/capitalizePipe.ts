import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize'
})

export class CapitalizePipe implements PipeTransform {

    transform(str, args) {
        let words = str.toLowerCase().split(' ');

        for (var i = 0; i < words.length; i++) {
          var letters = words[i].split('');
          letters[0] = letters[0].toUpperCase();
          words[i] = letters.join('');
        }
        // If second word = 'II, III, or IV' then force uppercase
        if (words[1] && (words[1] === 'Ii' || words[1] === 'Iii' || words[1] === 'Iv')) {
          words[1] = words[1].toUpperCase();  
        }
        return words.join(' ');
    }

}