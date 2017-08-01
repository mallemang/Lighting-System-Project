Handle[] handles;
int num;
int numhndls=6;
void setup()
{
  size(200, 200);
  num = height/15;
  num=6;
  int hhndls=height/num;
  handles = new Handle[num];
  int hsize = 10;
  for(int i=0; i<num; i++) {
    handles[i] = new Handle(width/2, 10+i*hhndls, 50-hsize/2, 20, handles);
  }
}

void draw()
{
  background(153);
  
  for(int i=0; i<num; i++) {
    handles[i].update();
    handles[i].display();
  }
  
  fill(255);// colour fill of the left part
  rect(0, 0, width/2, height);
}

void mouseReleased() 
{
  for(int i=0; i<num; i++) {
    handles[i].release();
  }
}

class Handle
{
  int x, y;
  int boxx, boxy;
  int length;
  int size;
  boolean over;
  boolean press;
  boolean locked = false;
  boolean otherslocked = false;
  Handle[] others;
  
  Handle(int ix, int iy, int il, int is, Handle[] o)
  {
    x = ix;
    y = iy;
    length = il;
    size = is;
    boxx = x+length - size/2;
    boxy = y - size/2;
    others = o;
  }// end of constructor
  
  void update() 
  {
    boxx = x+length;
    boxy = y - size/2;
    
    for(int i=0; i<others.length; i++) {
      if(others[i].locked == true) {
        otherslocked = true;
        break;
      } else {
        otherslocked = false;
      }  // end of else
    }// end of for
    
    if(otherslocked == false) {
      over();
      press();
    }
    
    if(press) {
      length = lock(mouseX-width/2-size/2, 0, width/2-size-1);
    }
  }// end of update
  
  void over()
  {
    if(overRect(boxx, boxy, size, size)) {
      over = true;
    } else {
      over = false;
    }
  }
  
  void press()
  {
    if(over && mousePressed || locked) {
      press = true;
      locked = true;
    } else {
      press = false;
    }
  }
  
  void release()
  {
    locked = false;
  }
  
  void display() 
  {
    line(x, y, x+length, y);
    fill(255);//fill of boxes
    stroke(0); // colour of lines 
    rect(boxx, boxy, size, size);
    if(over || press) {
      line(boxx, boxy, boxx+size, boxy+size);
      line(boxx, boxy+size, boxx+size, boxy);
    }
  
  }
}// end of handle class

boolean overRect(int x, int y, int width, int height) 
{
  if (mouseX >= x && mouseX <= x+width && 
      mouseY >= y && mouseY <= y+height) {
  return true;

  } else {
    return false;
  }
}

int lock(int val, int minv, int maxv) 
{ 
  return  min(max(val, minv), maxv); 
} 
