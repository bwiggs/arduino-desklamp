int redPin = 11;
int greenPin = 10;
int bluePin = 9;

int incomingByte = 0;

void setup()
{
  Serial.begin(9600);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);  
}

void loop()
{
  char hexColor[3];
  int red = 0;
  int green = 0;
  int blue = 0;
  
  delay(100);

  if (Serial.available() > 0)
  {
    printBytes();
    
    incomingByte = Serial.read();
    Serial.println(incomingByte);


//    green = Serial.read();
//    blue = Serial.read();
//    red = Serial.read();
//    
//    Serial.print("red:");
//    Serial.println(red);
//    
//    Serial.print("green: ");
//    Serial.println(green);
//    
//    Serial.print("blue: ");
//    Serial.println(blue);
//    
//    setColor(red, green, blue);
//    Serial.println();


  }  
}

void setColor(int red, int green, int blue)
{
  analogWrite(redPin, red); // red = ((hex >> 16) & 0xff) / 255.0;
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue);
}

void printBytes()
{
  Serial.print("Bytes: ");
  Serial.println(Serial.available());
}
