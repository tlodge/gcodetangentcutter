; Start
;
; Operation:    0
; Type:         Laser Cut
; Paths:        2
; Passes:       1
; Cut rate:     10000 mm/min
;


; Pass 0

; Pass 0 Path 0
G0 X-43.56 Y0.48
; Pass Z Height 1mm (Offset: 0mm)
G0 Z1.00

; constant power
; M3

; Adaptive Power ($31 must be set to 1)
M4
S1000.00
G1 X-10.56 Y15.41 F10000
G1 X-0.87 Y7.96
G1 X12.45 Y8.21
G1 X12.50 Y-1.27
G1 X19.03 Y-1.98
G1 X19.42 Y8.81
G1 X20.12 Y10.81
G1 X21.04 Y12.81
G1 X22.25 Y14.81
G1 X23.98 Y16.82
G1 X25.98 Y18.39
G1 X27.98 Y19.42
G1 X29.98 Y20.07
G1 X31.98 Y20.44
G1 X33.99 Y20.60
G1 X35.99 Y20.59
G1 X37.99 Y20.44
G1 X45.22 Y-2.45
G1 X45.43 Y-11.79
M5

; Pass 0 Path 1
; constant power
; M3

; Adaptive Power ($31 must be set to 1)
M4
S1000.00
G1 X29.55 Y-21.99 F10000
G1 X16.76 Y-10.20
M5