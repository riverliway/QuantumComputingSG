## Proof 2.4.1 - Rotations in Spherical Coordinates

Deriving the new spherical coordinates after a rotation around a cartesian axis is not trivial. The general outline is to convert from spherical to cartesian, then take an intersection of a plane through the sphere, convert to 2D polar, and back again.

### Rotation Around the X Axis

The goal of this derivation is to find the spherical coordinates $(1, \theta_x, \phi_x)$ which result from rotating the original spherical coordinates $(1, \theta, \phi)$ around the X axis counterclockwise by $\Delta$ radians. 

Note that we are using the physics definition of spherical coordinates where:

* $1$ is the radial distance from the origin to the surface of the unit sphere
* $\theta$ is the inclination angle from the positive Z axis:  $0\leq\theta\leq\pi$
* $\phi$ is the azimuth angle from the positive X axis: $0\leq\phi<2\pi$

<img src="..\..\resources\bloch_sphere.png" width="250px" />

To begin, first convert the spherical coordinates to cartesian.
$$
\begin{equation}
\begin{aligned}
x &= 1\ sin\theta\ cos\phi \\
y &= 1\ sin\theta\ sin\phi \\
z &= 1\ cos\theta
\end{aligned}
\end{equation}
$$
Use a plane to intersect the sphere, holding the $x$ value constant.

{insert image}

The intersection of the sphere and the plane is a circle, centered on the X axis, parallel with the YZ plane.

{insert image}

The radius of this circle is calculated by the pythagorean theorem.
$$
\begin{equation}
\begin{aligned}
r &= \sqrt{z^2+y^2}
\end{aligned}
\end{equation}
$$
The cartesian coordinates can also be expressed in polar coordinates with $\omega$ as the angle.
$$
\begin{equation}
\begin{aligned}
y &= r\ cos\omega \\
z &= r\ sin\omega
\end{aligned}
\end{equation}
$$
To rotate counterclockwise by $\Delta$ radians, simply add $\Delta$ to $\omega$ and use the sum of angles trigonometric identity.
$$
\begin{equation}
\begin{aligned}
x_x(\Delta) &= sin\theta\ cos\phi \\
y_x(\Delta) &= r\ cos(\omega+\Delta) = r\ (cos\omega\ cos\Delta-sin\omega\ sin\Delta) \\
z_x(\Delta) &= r\ sin(\omega+\Delta) = r\ (sin\omega\ cos\Delta+cos\omega\ sin\Delta)
\end{aligned}
\end{equation}
$$
To find our new inclination angle, we convert from the new cartesian coordinates.
$$
\begin{equation}
\begin{aligned}
\theta_x(\Delta) &= arctan(\frac{\sqrt{x_x^2+y_x^2}}{z_x}) \\
&= arctan(\frac{\sqrt{sin^2\theta\ cos^2\phi+r^2\ (cos\omega\ cos\Delta-sin\omega\ sin\Delta)^2}}{r\ (sin\omega\ cos\Delta+cos\omega\ sin\Delta)}) \\
&= arctan(\frac{\sqrt{sin^2\theta\ cos^2\phi+(y\ cos\Delta-z\ sin\Delta)^2}}{(z\ cos\Delta+y\ sin\Delta)}) \\
&= arctan(\frac{\sqrt{sin^2\theta\ cos^2\phi+(sin\theta\ sin\phi\ cos\Delta-cos\theta\ sin\Delta)^2}}{(cos\theta\ cos\Delta+sin\theta\ sin\phi\ sin\Delta)})
\end{aligned}
\end{equation}
$$
The same process can be used to find the azimuth angle.
$$
\begin{equation}
\begin{aligned}
\phi_x(\Delta) &= arctan(\frac{y_x}{x_x}) \\
&= arctan(\frac{r\ (cos\omega\ cos\Delta-sin\omega\ sin\Delta)}{sin\theta\ cos\phi}) \\
&= arctan(\frac{y\ cos\Delta-z\ sin\Delta}{sin\theta\ cos\phi}) \\
&= arctan(\frac{sin\theta\ sin\phi\ cos\Delta-cos\theta\ sin\Delta}{sin\theta\ cos\phi})
\end{aligned}
\end{equation}
$$
Since the $arctan$ function is an imperfect inverse, these new angles will need to be modified depending on the original inclination and azimuth angles.

