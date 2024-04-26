"use client";

import { Suspense } from 'react';
import Loading from "@/app/loading";
import { Menu } from '@/widgets/menu';


export default function Home() {

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Menu />
                <div className="flex justify-center ml-[70px]">
                    <div className='max-w-[700px]'>
                        <h1 className="font-medium my-5">Shatra Board</h1>
                        <p>
                            The tent uses a kind of game board, which is a rectangle measuring 7x14 fields with 62 black and white playing fields[2]. The fields of the board have conventional names: the rectangle that includes fields from 11 to 52 is called a large square field; squares 1-9 and 54-62 - black and white fortresses; fields 10 and 53 - gates of fortresses; the dividing line between horizontal rows 25-31 and 32-38 is a ditch; vertical 2—61—high road; fields 1-3 and 60-62 - fields for transforming the tent into other figures; parts of the board without numbering are the walls of fortresses; they are not played on. The playing board is positioned so that the end part with the white fortress is in front of the white player.
                        </p>


                        <h1 className="font-medium my-5">Figures</h1>
                        <p>
                            In the tent, checkers have their own names: biy, batyr, tura, yalkyn, tent. Before the start of the game, both opponents have one biy and a batyr, two rounds and two yalkyns and eleven tents. On the diagrams, tents are indicated by white and black circles. To indicate the beat, a circle of the opposite color 1/3 of the diameter is applied in the center of the same circle. A batyr is designated by a triangle inscribed in a circle, a tura by a square, and a yalkyn by a straight line running along the diameter of a circle of the opposite color. In souvenir sets, chess pieces are used for the game: the biy is replaced by a king, the batyr by a queen, the tura by a rook, the yalkyn by a bishop and the tent by a pawn. Sports kits use round flat checkers with distinctive signs for diagrams.

                            Initial arrangement of checkers:

                            White: biy - 53, batyr - 61, turs - 55, 58, yalkyns - 54, 56 and tents - 57, 59, 60, 62, 46-52

                            Black: biy - 10, batyr - 2, turs - 5.8, yalkyns - 7, 9 and tents - 1, 3, 4, 6, 11-17

                            The goal of the game is to destroy the bey or deprive the opponent of the opportunity to make a move.
                        </p>


                        <h1 className="font-medium my-5">Rules of play for figures</h1>
                        <p>The movement of checkers is carried out on all 62 free fields. Checkers located at the beginning of the game in fortresses and gates constitute a reserve. They cannot move in their fortress, but they can, during their turn to move, place one checker at a time on any of the fields of their half of the large field. Checkers cannot enter their fortress and gates while at least one checker of the initial reserve is there. Checkers that have entered their fortress and gate (if there are no initial reserve pieces in them), again acquire the right to reserve, as well as the right to move (in their fortress, from the fortress to the gate, and back) according to the general rules. Checkers that have entered someone else's fortress or its gates can move there according to the general rules, and according to the reserve rule, they can be placed on any of the fields of half of the opponent's large field.</p>

                        <h1 className="font-medium my-5">Shatra</h1>
                        <p>He only walks forward: in his own half of a large field - vertically for 1-2 fields, having reached the ditch - to the adjacent field vertically and diagonally, and being behind the ditch - to the neighboring field vertically, horizontally and diagonally. A tent that has reached any of the transformation fields in the enemy's fortress must be replaced by any other checker that the player does not have on the board at that moment. If there are all checkers on the board, then the transformation of the tent is postponed until one of them is captured. The unconverted tent runs horizontally.</p>

                        <h1 className="font-medium my-5">Biy</h1>
                        <p>Moves vertically, horizontally and diagonally to the adjacent field back and forth.</p>

                        <h1 className="font-medium my-5">Baatyr</h1>
                        <p>It moves vertically, horizontally and diagonally - on any number of squares free from other checkers, forward and backward. When he is in his fortress and its gates on the fields of the big road, he can go to any number of fields of the big road from 2 to 49 for white and from 14 to 61 for black, if the big road from the beginning to the end of the move is free from other checkers.</p>

                        <h1 className="font-medium my-5">Tura</h1>
                        <p>When he is in his fortress and its gates on the fields of the high road, he can walk just like a batyr.</p>


                        <h1 className="font-medium my-5">Capturing with pieces</h1>

                        <p>
                            In the tent, as well as in many other checkers systems, capturing the opponent's pieces is mandatory, both forward and backward. If it is possible to take in two or more directions, the choice is given to the taker. If the specified conditions for taking are present further along the straight line, or on those intersecting with it: for the batyr - vertical, horizontal or diagonal, for the rounds - vertical or horizontal, yalkyna - diagonal, then they are obliged to take all the checkers located on the orthogonals or diagonals closest to them opponent until the end of the chosen option. If one of the capturing pieces is hit, then he is not obliged to hit, but loses the right to make an unimpacted move. The right to hit is not completely reserved for him. When capturing, you can also place the taking checker on the same square any number of times, but you cannot “jump” over the same opponent’s checker twice. A checker located on a large field does not have the right to take those enemy checkers, after capturing which it moves to any of the fields of its fortress or gate, if the fortress has at least one of the checkers of the initial reserve. The tent located in the opponent's goal enjoys the right to capture according to the general rules and according to the rules for hitting. Taking checkers in and out of fortresses is carried out according to general rules. The checker of the initial reserve, after being captured in its fortress during the next unstressed move, must be placed according to the reserve rule.
                        </p>


                        <h1 className="font-medium my-5">Shatra</h1>

                        <p>
                            The tent hits an opponent's piece located on a horizontally, vertically or diagonally adjacent field, if there is a free field behind the latter in the direct line of the strike (capture), on which the hitting tent is placed. The white tent, located on one of the fields of the horizontal 25-31 (for the black - horizontal 32-38), is obliged to take the opponent’s tent if the latter resembles two fields at once along an adjacent vertical, and there is a free field diagonally behind the middle field of this vertical. This capture is called an en passant capture. If the specified conditions for capture continue to exist, then the tent must be beaten until the end of the chosen option. If the tent, when captured, reaches the transformation field in the opponent’s fortress, then the checker with which the tent was replaced must continue the capture with the same move, if any. A tent located on a large field does not have the right to take those enemy checkers, after taking which it stands on any of the fields of its fortress or its gates.
                        </p>


                        <h1 className="font-medium my-5">Biy</h1>

                        <p>
                            Capturing with a beat is carried out according to the rules for the tent, but in this case the taker is given the right to take the opponent’s checkers not until the end of the chosen option, as well as the right not to hit, but in this case the beater is obliged to move. Biy has the right to take those opponent's pieces, after which he becomes his own goal.
                        </p>




                        <h1 className="font-medium my-5">Baatyr</h1>

                        <p>
                            The batyr hits the opponent’s checker, standing on the same vertical, horizontal or diagonal as him, if there are no other checkers between them, and behind the beating checker in the straight line of the blow there is one or more free fields, on one of which the hitting batyr is placed.
                        </p>
                    </div>
                </div>
            </Suspense>
        </>
    );
}