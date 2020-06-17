; Start
;
; Operation:    0
; Type:         Laser Cut
; Paths:        1
; Passes:       1
; Cut rate:     5000 mm/min
;


; Pass 0

; Pass 0 Path 0
G0 X0.13 Y68.53
; constant power
; M3

; Adaptive Power ($31 must be set to 1)
M4
S1000.00
G1 X71.33 Y68.66 F5000
G1 X130.90 Y107.29
G1 X185.21 Y61.56
G1 X149.82 Y0.27
G1 X120.01 Y35.35
M5
; End