
function readibilityAlgorithm(){
    var current_text = document.getElementById("user_Input").value;
    var numberOfSentences = 0;
    var numberOfWords = 0;
    var numberOfSyllables = 0;
    var current_vowel_count = 0;
    for(var i=0; i<current_text.length; i++){
        if(current_text[i].charCodeAt(0) == 32){
            numberOfWords +=1;
            
        }
        else if(current_text[i].charCodeAt(0)==46){
            numberOfSentences+=1;
        }
        else if(isVowel(current_text[i])){
            numberOfSyllables+=1
        }
    }

    var A  = 206.835 - 1.015*(numberOfWords/numberOfSentences);
    var B = 84.6 * (numberOfSyllables/numberOfWords);

    console.log(A - B);

    console.log('length of text is: '+current_text.length);

    var message  = "The readibility score of the text<br><i>"+current_text+"</i><br><br> is: <h1>"+(A-B)+"</h1>";

    document.getElementById("demo").innerHTML =message;
}

function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
    console.log("HEllo bitches");
}
function isVowel(letter){
    if (letter == 'a' || letter == 'A'){
        return true;
    }
    else if (letter == 'e' || letter == 'E'){
        return true;
    }
    else if (letter == 'i' || letter == 'I'){
        return true;
    }
    else if (letter == 'o' || letter == 'O'){
        return true;
    }
    else if (letter == 'u' || letter == 'U'){
        return true;
    }
    else if (letter == 'y' || letter == 'Y'){
        return true;
    }
    return false;

}