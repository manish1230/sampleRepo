
interface shape {

    void draw();
}

class circle implements shape {

    @Override
    public void draw() {
        System.out.println("drawing a circle");
    }
}

class rectangle implements shape {

    @Override
    public void draw() {
        System.out.println("drawing a rectangle");
    }
}

class shapeFactory {

    public shape getShape(String shapeType) {
        if (shapeType == null) {
            return null;
        }
        if (shapeType.equalsIgnoreCase("circle")) {
            return new circle();
        } else if (shapeType.equalsIgnoreCase("rectangle")) {
            return new rectangle();
        }
        return null;
    }
}

public class main {

    public static void main(String[] args) {
        shapeFactory sf = new shapeFactory();
        shape shape1 = sf.getShape("circle");
        shape1.draw();
        shape shape2 = sf.getShape("rectangle");
        shape2.draw();
    }
}
